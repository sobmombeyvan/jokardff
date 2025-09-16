<template>
  <UtilsDialogAlert
      :is-open="openWarning"
      variant="warning"
      :set-is-open="() =>  { openWarning = !openWarning }"
      title="Confirmer le changement d'URL"
      description="La modification de l'URL invalidera vos QR codes et cartes NFC existants. Il sera nécessaire de générer de nouveaux QR codes et cartes pour garantir leur bon fonctionnement."
      :handle-action="async () => {
        openWarning = false;
        await onSubmit();
      }"
      action-text="Continuer"
  />
  <div
      v-if="isLoading"
      class=" w-full h-full bg-black/30 fixed top-0 left-0 z-50 flex justify-center items-center flex-col text-white gap-4">
    <h2 class="text-3xl font-bold">Chargement</h2>
    <Loader2 class="size-20 mr-2 animate-spin"/>
  </div>
  <div class="flex items-center justify-between space-y-2">
    <DashTitle title="Cartes de visite numériques" :breadcrumb="breadcrumb"/>
  </div>
  <div class="flex items-start sm:gap-6 gap-4 sm:flex-row flex-col w-full">
    <Tabs default-value="template" :model-value="currentTab" class="sm:w-8/12 w-full">
      <TabsList class="w-full border bg-black py-2  gap-2">
        <TabsTrigger value="content" @click="currentTab = 'content' " class="flex items-center py-2 space-x-2">
          <span :class="currentTab != 'content' && 'bg-gray-500 text-gray-800'"
                class=" h-5 w-5 rounded-full bg-black block text-white">1</span>
          <span class="sm:block hidden">Contenu</span>
        </TabsTrigger>
        <ChevronRight/>
        <TabsTrigger value="setting" @click="currentTab = 'setting' " class="flex items-center py-2 space-x-2">
          <span :class="currentTab != 'setting' && 'bg-gray-500 text-gray-800'"
                class=" h-5 w-5 rounded-full bg-black block text-white">2</span>
          <span class=" sm:block hidden">Design / paramètres</span>
        </TabsTrigger>
        <ChevronRight/>
        <TabsTrigger value="qrcode" @click="currentTab = 'qrcode' " class="flex items-center py-2 space-x-2">
          <span :class="currentTab != 'qrcode' && 'bg-gray-500 text-gray-800'"
                class=" h-5 w-5 rounded-full bg-black block text-white">3</span>
          <span class=" sm:block hidden">Qr Code</span>
        </TabsTrigger>
        <ChevronRight/>
        <TabsTrigger value="card" @click="currentTab = 'card' " class="flex items-center py-2 space-x-2">
          <span :class="currentTab != 'card' && 'bg-gray-500 text-gray-800'"
                class="h-5 w-5 rounded-full bg-black block text-white">4</span>
          <span class="sm:block hidden">Carte</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <Card class=" w-full">
          <CardHeader class=" border-b">
            <CardTitle>Contenu</CardTitle>
            <CardDescription>
              Personnalisez votre carte de visite digitale.
            </CardDescription>
          </CardHeader>
          <CardContent class="pt-4 w-full">
            <BcardContent v-model="settingPage" :onSubmit="onSubmit"/>
          </CardContent>
          <CardFooter class=" justify-end border-t pt-4">
            <Button type="button" @click="currentTab = 'setting' ">
              <ChevronRight class="h-5 w-5"/>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="setting">
        <Card>
          <CardHeader class="border-b">
            <CardTitle>Design / Parametres</CardTitle>
            <CardDescription>
              Configurez votre carte digitale
            </CardDescription>
          </CardHeader>
          <CardContent class="pt-4 w-full">
            <BcardSetting v-model="settingDesign"/>
          </CardContent>
          <CardFooter class=" justify-between border-t pt-4">
            <Button type="button" @click="currentTab = 'content' ">
              <ChevronLeft class="h-5 w-5"/>
            </Button>
            <Button type="button" @click="currentTab = 'qrcode' ">
              <ChevronRight class="h-5 w-5"/>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="qrcode">
        <Card>
          <CardHeader class="border-b">
            <CardTitle>Qr Code</CardTitle>
            <CardDescription>
              Personnalisez le qr code de votre carte digitale!
            </CardDescription>
          </CardHeader>
          <CardContent class="pt-4 w-full">
            <BcardQrcode v-model:options="settingQrCode" v-model:upload="uploadQrCode"/>
          </CardContent>
          <CardFooter class=" justify-between border-t pt-4">
            <Button type="button" @click="currentTab = 'setting' ">
              <ChevronLeft class="h-5 w-5"/>
            </Button>
            <Button type="button" @click="currentTab = 'card' ">
              <ChevronRight class="h-5 w-5"/>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="card">
        <Card>
          <CardHeader class="border-b">
            <CardTitle>Carte physique</CardTitle>
            <CardDescription>
              Personnalisez votre carte physique à votre image.
            </CardDescription>
          </CardHeader>
          <CardContent class="pt-4 w-full">
            <BcardCard v-model="settingCard"/>
          </CardContent>
          <CardFooter class=" justify-between border-t pt-4">
            <Button type="button" @click="currentTab = 'qrcode' ">
              <ChevronLeft class="h-5 w-5"/>
            </Button>
            <Button type="button">
              <Check class="h-5 w-5"/>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    <Tabs default-value="preview" class="sticky top-16 sm:w-4/12 w-full">
      <div class="flex justify-between items-center space-x-2">
        <TabsList class="grid  grid-cols-3">
          <TabsTrigger value="preview">
            <Eye class="h-5 w-5"/>
          </TabsTrigger>
          <TabsTrigger value="qrcode">
            <QrCode class="h-5 w-5"/>
          </TabsTrigger>
          <TabsTrigger value="card">
            <IdCard class="h-6 w-6"/>
          </TabsTrigger>
        </TabsList>

        <div class=" items-center space-x-2 flex">
          <Button
              type="button"
              variant="outline"
              @click="openPage"
              size="sm"
          >
            <SquareArrowOutUpRight class="h-5 w-5"/>
          </Button>
          <Button type="button" @click="checkURL" size="sm">
            Enregsitrer
          </Button>
        </div>
      </div>
      <TabsContent value="preview">
        <Card>
          <CardContent class="pt-6 sm:px-10">
            <CardPhone :blocks="settingPage.blocks" :template="settingPage.template"/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="qrcode">
        <Card>
          <CardContent class="space-y-2 pt-6 justify-center items-center flex">
            <QRCode ref="QRCodeRef" :options="settingQrCode"/>
          </CardContent>
          <CardFooter>
            <Button @click="downloadQrCode" type="button" class=" w-full space-x-2">
              <Download class="h-5 w-5"/>
              <span>Enregistrer & Telecharger</span>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="card">
        <Card class="bg-slate-100">
          <CardContent class="pt-6 sm:px-10">
            <CardPhysicalCard :data="settingCard" :firstname="(profileSection.values as ProfileBlockProps).firstname!"
                              :lastname="(profileSection.values as ProfileBlockProps).lastname!"/>
          </CardContent>
          <CardFooter>
            <Button @click="QRCodeRef?.download()" type="button" class=" w-full space-x-2">
              <span>Commander ma carte</span>
              <Truck class="h-5 w-5"/>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  IdCard,
  Loader2,
  QrCode,
  SquareArrowOutUpRight,
  Truck
} from 'lucide-vue-next';
import type BreadcrumbProps from "~/types/BreadcrumbProps";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from '@/components/ui/tabs'
import QRCode from "~/components/dash/QRCode.vue";
import type {SettingDesignProps} from "~/types/SettingDesignProps";
import type {Options} from "qr-code-styling";
import type {SettingCardProps} from "~/types/SettingCardProps";
import type {ProfileBlockProps, UploadImageProps} from "~/types/ProfileBlockProps";
import generateID from "~/utils/generateID";
import type {ContentBlockSettingBlocksProps, ContentBlockSettingProps} from "~/types/ContentBlockSettingProps";
import {schemaHandleUrl} from "~/utils/schema/handleUrl";
import {toast} from "~/components/ui/toast";
import generateUrlFile from "~/utils/generateUrlFile";

const route = useRoute();
const router = useRouter();
const {getBackgrounds} = useConfigBackground();
const {updatePage, getPageById} = usePage();

const {data: page, status} = await useAsyncData('page', () => getPageById(route.params.id as string), {immediate: true});
useAsyncData('backgrounds', getBackgrounds).then((d) => {
  const isUploadBg = d.data.value!.filter((bg) => page.value?.page_setting_designs.background_image && bg.path === page.value?.page_setting_designs.background_image)[0];
  if(!isUploadBg && settingDesign.backgroundImage){
    settingDesign.backgroundImage.upload.push({path: page.value?.page_setting_designs.background_image!})
  };
});
let oldURL = '';
if (!page.value) {
  toast({
    title: 'Oh, oh ! Quelque chose a mal tourné.',
    description: 'Page introuvable',
    variant: 'destructive',
  });
  router.push('/dashboard/bcards');
}else{
  oldURL = page.value?.url!;
}

const openWarning = ref(false)
const isLoading = ref(true);
const QRCodeRef = ref<InstanceType<typeof QRCode> | null>(null);
const breadcrumb = ref<BreadcrumbProps[]>([]);
const currentTab = ref<string>('content');
const uploadQrCode = ref<UploadImageProps[]>([]);
const settingPage = reactive<ContentBlockSettingProps>({
  url: page.value?.url!,
  template: page.value?.template!,
  blocks: JSON.parse(page.value?.blocks as string) as ContentBlockSettingBlocksProps[],
});
const settingDesign = reactive<SettingDesignProps>({
  backgroundImage: {
    image: page.value?.page_setting_designs.background_image ? page.value?.page_setting_designs.background_image : '',
    upload: [],
  },
  color: {
    primaryColor: page.value?.page_setting_designs.primary_color!,
    secondaryColor: page.value?.page_setting_designs.secondary_color!,
    profileTextPrimary: page.value?.page_setting_designs.profile_text_primary_color!,
    profileTextSecondary: page.value?.page_setting_designs.profile_text_secondary_color!,
    textPrimary: page.value?.page_setting_designs.text_primary_color!,
    textSecondary: page.value?.page_setting_designs.text_secondary_color!,
  },
  fontFamily: page.value?.page_setting_designs.font_family!,
  card: {
    active: page.value?.page_setting_designs.card_active!,
    backgroundColor: page.value?.page_setting_designs.card_background_color!,
    radius: [page.value?.page_setting_designs.card_radius!],
    dropShadow: page.value?.page_setting_designs.card_drop_shadow!,
    x: page.value?.page_setting_designs.card_x!,
    y: page.value?.page_setting_designs.card_y!,
    blur: page.value?.page_setting_designs.card_blur!,
    spread: page.value?.page_setting_designs.card_spread!,
  }
});
const settingQrCode = reactive<Partial<Options>>(page.value?.page_setting_qrcodes.data! as Partial<Options>);
const settingCard = reactive<SettingCardProps>({
  verso: {
    size: [page.value?.page_setting_cards.verso_size!],
    showName: page.value?.page_setting_cards.verso_show_name!,
    image: page.value?.page_setting_cards.verso_image ? [{path:page.value?.page_setting_cards.verso_image}] : [],
  },
  recto: {
    size: [page.value?.page_setting_cards.recto_size!],
    image: page.value?.page_setting_cards.recto_image ? [{path:page.value?.page_setting_cards.recto_image}] : [],
  },
  color: {
    backgroundColor: page.value?.page_setting_cards.background_color!,
    pictoColor: page.value?.page_setting_cards.picto_color!,
  }
});

onMounted(() => {
  breadcrumb.value = [{label: 'Tableau de bord', link: '/dashboard'}, {
    label: 'Carte de visite',
    link: '/dashboard/bcards'
  }, {
    label: 'Editer une Carte',
    link: `/dashboard/bcards/${page.value?.id}`
  }];

  const root = document.querySelector(':root') as HTMLElement;

  root?.style.setProperty('--jokard-background-image', `url(${ page.value?.page_setting_designs.background_image ? generateUrlFile(page.value?.page_setting_designs.background_image) : null})`);
  root?.style.setProperty('--jokard-primary-color', page.value?.page_setting_designs.primary_color!);
  root?.style.setProperty('--jokard-secondary-color', page.value?.page_setting_designs.secondary_color!);
  root?.style.setProperty('--jokard-profile-text-primary-color', page.value?.page_setting_designs.profile_text_primary_color!);
  root?.style.setProperty('--jokard-profile-text-secondary-color', page.value?.page_setting_designs.profile_text_secondary_color!);
  root?.style.setProperty('--jokard-text-primary-color', page.value?.page_setting_designs.text_primary_color!);
  root?.style.setProperty('--jokard-text-secondary-color', page.value?.page_setting_designs.text_secondary_color!);
  root?.style.setProperty('--jokard-font-family', `"${page.value?.page_setting_designs.font_family}", system-ui, sans-serif`);
  root?.style.setProperty('--jokard-card-border-radius', `${page.value?.page_setting_designs.card_radius}px`);

  if (page.value?.page_setting_designs.card_active) {
    root?.style.setProperty('--jokard-card-box-shadow', `${page.value?.page_setting_designs.card_x} ${page.value?.page_setting_designs.card_y} ${page.value?.page_setting_designs.card_blur} ${page.value?.page_setting_designs.card_spread} ${page.value?.page_setting_designs.card_drop_shadow}`);
    root?.style.setProperty('--jokard-card-background-color', page.value?.page_setting_designs.card_background_color);
  } else {
    root?.style.setProperty('--jokard-card-box-shadow', 'none');
    root?.style.setProperty('--jokard-card-background-color', 'transparent');
  }

  isLoading.value = false;
});

const profileSection = computed(() => settingPage.blocks.filter((block) => block.type === 'profile')[0]);

watch(settingDesign.backgroundImage, (newSetting, oldSetting) => {
  const root = document.querySelector(':root') as HTMLElement;
  let img = '';
  if (newSetting.image === 'none') {
    img = "url('')"
  } else if (newSetting.image === 'upload' && newSetting.upload[0]) {
    img = `url(${newSetting.upload[0].path})`;
  } else {
    img = `url(${newSetting.image})`;
  }
  root?.style.setProperty('--jokard-background-image', img);
});

watch(settingDesign.color, (newSetting, oldSetting) => {
  const root = document.querySelector(':root') as HTMLElement;
  root?.style.setProperty('--jokard-primary-color', newSetting.primaryColor);
  root?.style.setProperty('--jokard-secondary-color', newSetting.secondaryColor);
  root?.style.setProperty('--jokard-profile-text-primary-color', newSetting.profileTextPrimary);
  root?.style.setProperty('--jokard-profile-text-secondary-color', newSetting.profileTextSecondary);
  root?.style.setProperty('--jokard-text-primary-color', newSetting.textPrimary);
  root?.style.setProperty('--jokard-text-secondary-color', newSetting.textSecondary);
});

watch(settingDesign.card, (newSetting, oldSetting) => {
  const root = document.querySelector(':root') as HTMLElement;
  root?.style.setProperty('--jokard-card-border-radius', `${newSetting.radius[0]}px`);
  if (newSetting.active) {
    root?.style.setProperty('--jokard-card-box-shadow', `${newSetting.x} ${newSetting.y} ${newSetting.blur} ${newSetting.spread} ${newSetting.dropShadow}`);
    root?.style.setProperty('--jokard-card-background-color', newSetting.backgroundColor);
  } else {
    root?.style.setProperty('--jokard-card-box-shadow', 'none');
    root?.style.setProperty('--jokard-card-background-color', 'transparent');
  }
});

watch(uploadQrCode.value, (newUpload, oldUpload) => {

  if (newUpload[0]) {
    settingQrCode.image = newUpload[0].path;
  } else {
    settingQrCode.image = undefined;
  }
});

watch(settingQrCode, (newSetting, oldSetting) => {
  settingQrCode.data = window.location.origin + '/page/' + settingPage.url;
  if (QRCodeRef.value) {
    QRCodeRef.value.update();
  }
});

watch(() => settingDesign.fontFamily, (newSetting, oldSetting) => {
  const root = document.querySelector(':root') as HTMLElement;
  root?.style.setProperty('--jokard-font-family', `"${newSetting}", system-ui, sans-serif`);
});

const onSubmit = async () => {
  const valUrl = schemaHandleUrl.parse({url: settingPage.url});
  if ((await valUrl).errors.length > 0) {
    toast({
      title: 'Oh, oh ! Quelque chose a mal tourné.',
      description: 'URL invalide',
      variant: 'destructive',
    });
    return
  }
 isLoading.value = true;
  settingQrCode.data = window.location.origin + '/page/' + settingPage.url;
  await updatePage({
    oldPage: page.value!,
    page: settingPage,
    settingDesign,
    settingQrCode,
    settingCard,
    uploadQrCode: uploadQrCode.value
  },  page.value?.id!);
  oldURL = settingPage.url;
  isLoading.value = false;
}

const openPage = async() => {
  if(await checkURL()){
    window.open(`/page/${settingPage.url}`, '_blank');
  }
}

const downloadQrCode = async () => {
  if(await checkURL()){
    if(QRCodeRef.value) QRCodeRef.value.download();
  }
}

const checkURL = async () => {
  if(oldURL !== settingPage.url){
    openWarning.value = true;
    return false;
  }else{
    await onSubmit();
    return true;
  }
}
</script>

<style scoped>

</style>