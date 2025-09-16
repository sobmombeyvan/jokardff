<template>
  <DashDialog :is-open="openAddBackground" :set-is-open="() => {openAddBackground = !openAddBackground}"
              title="Ajouter des images/videos de fond"
              description="Selectionnez les fichiers et cliquez sur enregistrer">
    <FormBackground :close-modal="() => {openAddBackground = !openAddBackground}"/>
  </DashDialog>
  <DashDialog :is-open="openAddColor" :set-is-open="() => {openAddColor = !openAddColor}"
              title="Ajouter une configuration couleur"
              description="Selectionnez vos couleurs et cliquez sur enregistrer">
    <FormColor :data="colors" :close-modal="() => {openAddColor = !openAddColor}"/>
  </DashDialog>
  <div class="flex items-center justify-between space-y-2">
    <DashTitle title="Configurations" :breadcrumb="breadcrumb"/>
  </div>
  <div class="max-w-5xl space-y-10 w-full mx-auto">
    <Card>
      <CardHeader class=" border-b flex sm:flex-row flex-col sm:items-center items-start  sm:justify-between">
        <div class="flex flex-col gap-2">
          <CardTitle>Images/videos de fond</CardTitle>
          <CardDescription>
            Ajoutez les images ou videos de fond que les utilisateurs pourront utiliser.
          </CardDescription>
        </div>
        <div>
          <Button type="button" @click="() => { openAddBackground = true }">Ajouter</Button>
        </div>
      </CardHeader>
      <CardContent class="pt-4">
        <div class="flex justify-start gap-3 items-center flex-wrap">
          <CardBackground v-for="background in dataBackgrounds" :key="background.id!" :data="background"/>
        </div>
        <ClientOnly>
          <div v-if="statusBackgrounds === 'pending'" class="flex justify-center items-center h-12 w-full">
            <Loader2 class="size-10 mr-2 animate-spin"/>
          </div>
        </ClientOnly>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class=" border-b flex sm:flex-row flex-col sm:items-center items-start sm:justify-between">
        <div class=" flex flex-col gap-2">
          <CardTitle>Couleurs</CardTitle>
          <CardDescription>
            Ajoutez ou Modifiez les configurations de couleur que les utilisateurs pourront utiliser.
          </CardDescription>
        </div>
        <div>
          <Button type="button" @click="() => { openAddColor = true }">Ajouter</Button>
        </div>
      </CardHeader>
      <CardContent class="pt-4">
        <div class="flex justify-start gap-3 items-center flex-wrap">
          <CardColor v-for="color in dataColors" :key="color.id!" :data="color"/>
        </div>
        <ClientOnly>
          <div v-if="statusColors === 'pending'" class="flex justify-center items-center h-12 w-full">
            <Loader2 class="size-10 mr-2 animate-spin"/>
          </div>
        </ClientOnly>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type BreadcrumbProps from "~/types/BreadcrumbProps";
import type {ColorProps} from "~/types/ColorProps";
import {Loader2} from "lucide-vue-next";

const {getBackgrounds} = useConfigBackground();
const {getColors} = useConfigColor();
const breadcrumb = ref<BreadcrumbProps[]>([]);
const openAddBackground = ref(false);
const openAddColor = ref(false);
const colors = reactive<ColorProps>({
  primary_color: '#000000',
  secondary_color: '#000000',
  text_primary_color: '#000000',
  text_secondary_color: '#000000',
  profile_text_primary_color: '#000000',
  profile_text_secondary_color: '#000000',
});
onMounted(() => {
  breadcrumb.value = [{label: 'Tableau de bord', link: '/dashboard'}, {
    label: 'Configurations',
    link: '/dashboard/configurations'
  }];
});
const {data: dataColors, status: statusColors} = useAsyncData('colors', getColors);
const {data: dataBackgrounds, status: statusBackgrounds} = useAsyncData('backgrounds', getBackgrounds);
definePageMeta({
  middleware: ["admin"]
});
</script>

<style scoped>

</style>