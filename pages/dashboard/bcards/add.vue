<template>
  <div
      v-if="isLoading"
      class=" w-full h-full bg-black/30 fixed top-0 left-0 z-50 flex justify-center items-center flex-col text-white gap-4">
    <h2 class="text-3xl font-bold">Enregistrement</h2>
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
          <Button type="button" @click="onSubmit" size="sm">
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
            <Button @click="QRCodeRef?.download()" type="button" class=" w-full space-x-2">
              <Download class="h-5 w-5"/>
              <span>Telecharger</span>
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
import type {ContentBlockSettingProps} from "~/types/ContentBlockSettingProps";
import {schemaHandleUrl} from "~/utils/schema/handleUrl";
import {toast} from "~/components/ui/toast";
import generateUrlFile from "~/utils/generateUrlFile";

const route = useRoute();
const router = useRouter();
const { getAuthUser } = useUser();
const {createPage} = usePage();
const isLoading = ref(false);
const QRCodeRef = ref<InstanceType<typeof QRCode> | null>(null);
const breadcrumb = ref<BreadcrumbProps[]>([]);
const currentTab = ref<string>('content');
const uploadQrCode = ref<UploadImageProps[]>([]);
const settingPage = reactive<ContentBlockSettingProps>({
  url: generateID(),
  template: 'template-1',
  blocks: [
    {
      type: 'profile',
      values: {
        id: `profile-1`,
        activate: true,
        firstname: 'John',
        buttonLabel: 'Ajouter au contact',
        lastname: 'Doe',
        heading: 'CEO',
        subHeading: 'Ultimate International',
        profilePicture: [{
          path: 'https://dyjboajbpnstaqbhlrpy.supabase.co/storage/v1/object/public/jokard_images/user-4a4a563d-16b6-4033-8ba3-6e3722994e6d/pexels-nazar-aslan-443954785-29656484.jpg?t=2025-01-01T04%3A42%3A23.931Z'
        }],
        logoCompany: [{
          path: 'https://dyjboajbpnstaqbhlrpy.supabase.co/storage/v1/object/public/jokard_images/user-4a4a563d-16b6-4033-8ba3-6e3722994e6d/LOGO%20J%20BLACK.png'
        }],
        backgroundImage: [{
          path: 'https://dyjboajbpnstaqbhlrpy.supabase.co/storage/v1/object/public/jokard_images/user-4a4a563d-16b6-4033-8ba3-6e3722994e6d/pexels-mographe-11264112.jpg?t=2025-01-01T04%3A09%3A12.253Z'
        }],
        icons: [{
          type: 'Mail',
          value: '',
        }, {
          type: 'Phone',
          value: '',
        }, {
          type: 'MessageSquare',
          value: '',
        }],
      }
    },
    {
      type: 'contact',
      values: {
        id: `contact-2`,
        activate: true,
        activateButton: false,
        heading: 'Contactez nous',
        buttonLabel: 'Ajouter au contact',
        items: [
          {
            type: 'Email',
            values: {
              label: 'E-mail',
              value: 'contactme@domain.com',
            }
          },
          {
            type: 'Number',
            values: {
              label: 'Appeller nous',
              value: '123 456 7890',
            }
          },
          {
            type: 'Adress',
            values: {
              label: 'Adresse',
              line1: 'Street',
              line2: '',
              city: 'city',
              state: 'state',
              country: 'country',
              zipCode: 'zipCode',
              locationLabel: 'Localisation',
              locationURL: '#',
            }
          }
        ],
      }
    },
  ]
});
const settingDesign = reactive<SettingDesignProps>({
  backgroundImage: {
    image: 'none',
    upload: [],
  },
  color: {
    primaryColor: '#042418',
    secondaryColor: '#000000',
    profileTextPrimary: '#ffffff',
    profileTextSecondary: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#00000070',
  },
  fontFamily: 'system-ui',
  card: {
    active: true,
    backgroundColor: '#ffffff',
    radius: [16],
    dropShadow: '#64646f33',
    x: 0,
    y: 7,
    blur: 29,
    spread: 0,
  }
});
const settingQrCode = reactive<Partial<Options>>({
  width: 250,
  height: 250,
  type: "svg",
  data: window.location.origin + '/page/' + settingPage.url,
  image: undefined,
  margin: 0,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q',
  },
  dotsOptions: {
    color: "#000",
    type: "rounded"
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
    crossOrigin: 'anonymous',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    color: '#000',
    type: 'extra-rounded'
  },
  cornersDotOptions: {
    color: '#000',
    type: 'dot'
  }
});
const settingCard = reactive<SettingCardProps>({
  verso: {
    size: [50],
    showName: true,
    image: [],
  },
  recto: {
    size: [50],
    image: [],
  },
  color: {
    backgroundColor: "#ffffff",
    pictoColor: "#000000",
  }
});

const profileSection = computed(() => settingPage.blocks.filter((block) => block.type === 'profile')[0]);

watch(settingDesign.backgroundImage, (newSetting, oldSetting) => {
  const root = document.querySelector(':root') as HTMLElement;
  let img = '';
  if (newSetting.image === 'none') {
    img = "url('')"
  } else if (newSetting.image === 'upload' && newSetting.upload[0]) {
    img = `url(${generateUrlFile(newSetting.upload[0].path)})`;
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

onMounted(() => {
  breadcrumb.value = [{label: 'Tableau de bord', link: '/dashboard'}, {
    label: 'Carte de visite',
    link: '/dashboard/bcards'
  }, {
    label: 'Ajouter une Carte',
    link: '/dashboard/bcards/add'
  }];

  const root = document.querySelector(':root') as HTMLElement;

  root?.style.setProperty('--jokard-background-image', `url('')`);
  root?.style.setProperty('--jokard-primary-color', '#042418');
  root?.style.setProperty('--jokard-secondary-color', '#000000');
  root?.style.setProperty('--jokard-profile-text-primary-color', '#ffffff');
  root?.style.setProperty('--jokard-profile-text-secondary-color', '#ffffff');
  root?.style.setProperty('--jokard-text-primary-color', '#000000');
  root?.style.setProperty('--jokard-text-secondary-color', '#00000070');
  root?.style.setProperty('--jokard-font-family', `system-ui, sans-serif`);
  root?.style.setProperty('--jokard-card-border-radius', `16px`);

    root?.style.setProperty('--jokard-card-box-shadow', `0px 7px 29px 0px #64646f33`);
    root?.style.setProperty('--jokard-card-background-color', '#ffffff');

});

const {data: user, status} = useAsyncData('auth-user', getAuthUser);

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
  const res = await createPage({
    page: settingPage,
    settingDesign,
    settingQrCode,
    settingCard,
    uploadQrCode: uploadQrCode.value
  }, route.query.user ? route.query.user as string : user.value?.id!);
  isLoading.value = false;
  if(res?.id) router.push(`/dashboard/bcards/${res?.id!}`);
}

definePageMeta({
  middleware: ["subscription"]
});
</script>

<style scoped>

</style>