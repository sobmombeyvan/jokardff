<template>
  <template v-if="isLoading">
    <div class="flex justify-center items-center h-screen w-full"
         :style="`background-color:${page ? page.page_setting_designs.secondary_color : '#000'}`">
        <NuxtImg src="/images/logo_trans.png" class="size-24 animate-pulse"/>
    </div>
  </template>
  <template v-else>

    <div class="z-10 fixed  bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
      <button @click="shareLink" type="button" :class="`jokard-${page?.template}`" class="rounded-full jokard-action-button p-3 flex items-center justify-center">
        <Share2 class="size-7" />
      </button>
      <Drawer>
        <DrawerTrigger as-child>
          <button type="button" :class="`jokard-${page?.template}`" class="rounded-full jokard-action-button p-3 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
            </svg>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader class="items-center justify-center gap-2 flex flex-col">
            <div v-if="profileSection && profileSection.profilePicture[0]" class="h-40 w-40 rounded-full overflow-hidden">
              <NuxtImg height="400" width="400"
                       :src="generateUrlFile(profileSection.profilePicture[0]!.path)" class="object-cover w-full h-full"/>
            </div>
            <DrawerTitle class="text-center">{{ `${profileSection?.firstname} ${profileSection?.lastname}` }}</DrawerTitle>
            <DrawerDescription class="text-center">
              {{ profileSection?.heading }}
            </DrawerDescription>
            <DrawerDescription class="text-center">
              {{ profileSection?.subHeading }}
            </DrawerDescription>
          </DrawerHeader>
          <div class="w-full py-4 items-center justify-center flex">
            <QRCode v-if="settingQrCode" ref="QRCodeRef" :options="settingQrCode"/>
          </div>
          <DrawerFooter class="pt-2">
            <DrawerClose as-child>
              <Button variant="outline" type="button" class=" max-w-4xl w-full mx-auto">
                Fermer
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
    <TemplateTemplate1Template v-if="page?.template === 'template-1'" :vcfUrl="vcfUrl" :blocks="blocks"/>
    <TemplateTemplate2Template v-if="page?.template === 'template-2'" :vcfUrl="vcfUrl" :blocks="blocks"/>
    <TemplateTemplate3Template v-if="page?.template === 'template-3'" :vcfUrl="vcfUrl" :blocks="blocks"/>
    <TemplateTemplate4Template v-if="page?.template === 'template-4'" :vcfUrl="vcfUrl" :blocks="blocks"/>
    <TemplateTemplate5Template v-if="page?.template === 'template-5'" :vcfUrl="vcfUrl" :blocks="blocks"/>
  </template>
</template>

<script setup lang="ts">
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import type {ContentBlockSettingBlocksProps} from "~/types/ContentBlockSettingProps";
import type {ProfileBlockProps} from "~/types/ProfileBlockProps";
import generateUrlFile from "~/utils/generateUrlFile";
import createVCF from "~/utils/generateVCF";
import fonts from "~/data/fonts";
import {Share2} from "lucide-vue-next";
import QRCode from "~/components/dash/QRCode.vue";
import type {Options} from "qr-code-styling";
import {toast} from "~/components/ui/toast";


const QRCodeRef = ref<InstanceType<typeof QRCode> | null>(null);
const blocks = ref<ContentBlockSettingBlocksProps[]>([]);
const vcfUrl = ref<string | null>(null);
const settingQrCode = ref<Partial<Options> | undefined>(undefined)
const route = useRoute();
const isLoading = ref(true);
const {getPage, addPageView} = usePage();
const font = ref<{name:string;link:string}| undefined>(undefined);
const profileSection = ref<ProfileBlockProps | undefined>(undefined);
const {data: page, status} = await useAsyncData('page', () => getPage(route.params.url as string), {immediate: true});

if (!page.value) {
  throw createError({statusCode: 404, message: 'Page introuvable'});
} else {
  font.value = fonts.filter((f) => f.name === page.value?.page_setting_designs.font_family)[0] || undefined;
  blocks.value = JSON.parse(page.value?.blocks as string) as ContentBlockSettingBlocksProps[];
  profileSection.value = (blocks.value.filter((block) => block.type === 'profile')[0].values as ProfileBlockProps);
  settingQrCode.value = page.value?.page_setting_qrcodes.data as Partial<Options>;
}

const shareLink = async () => {
  try {
    await navigator.share({
      title: `${profileSection.value?.firstname} ${profileSection.value?.lastname}` ,
      text: `${profileSection.value?.firstname} ${profileSection.value?.lastname} - partage avec vous ça ma carte digitale Jokard :)` ,
      url: window.location.origin + `/page/${page.value?.url}`,
    });
  } catch (err) {
    await copyToClipboard();
  }
}

const copyToClipboard = async () => {
  try {
    const text = window.location.origin + `/page/${page.value?.url}`;
    await navigator.clipboard.writeText(text);
    toast({
      title: 'URL copié dans le presse-papier !',
    });
  } catch (err) {
    toast({
      title: 'Échec de partage du lien',
      variant: 'destructive'
    });
  }
};

onMounted(async () => {
  vcfUrl.value = await createVCF(blocks.value);
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

  fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        addPageView(page.value?.id!, data.city);
      })
      .catch(error => {
        addPageView(page.value?.id!, 'Anonymous');
      });
});

definePageMeta({
  layout: "page",
});

useHead({
  title: profileSection.value ? `${profileSection.value.firstname} ${profileSection.value.lastname}` : 'Jokard',
  meta: [
    { name: 'description', content: profileSection.value ? `${profileSection.value.heading} ${profileSection.value.subHeading}` : 'Jokard - créer votre carte de visite digitale NFC en 2 cliques' },
    { name: 'og:description', content: profileSection.value ? `${profileSection.value.heading} ${profileSection.value.subHeading}` : 'Jokard - créer votre carte de visite digitale NFC en 2 cliques'},
    { name: 'twitter:description', content: profileSection.value ? `${profileSection.value.heading} ${profileSection.value.subHeading}` : 'Jokard - créer votre carte de visite digitale NFC en 2 cliques' },
    { name: 'og:title', content: profileSection.value ? `${profileSection.value.firstname} ${profileSection.value.lastname}` : 'Jokard' },
    { name: 'twitter:title', content: profileSection.value ? `${profileSection.value.firstname} ${profileSection.value.lastname}` : 'Jokard' },
    { name: 'og:image', content: profileSection.value ? `${generateUrlFile(profileSection.value.profilePicture[0].path)}` : '/images/logo.png' },
    { name: 'twitter:image', content: profileSection.value ? `${generateUrlFile(profileSection.value.profilePicture[0].path)}` : '/images/logo.png' },
  ],
  link: page.value.page_setting_designs.font_family !== 'none' && font.value  ? [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: font.value.link
    }
  ] : []
});
</script>

<style scoped>

</style>