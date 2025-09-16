<template>
  <DashDialog :is-open="openAdd" :set-is-open="() => {openAdd = !openAdd}" title="Ajouter" description="Entrez les informations et cliquez sur enregistrer">
    <FormSubscription :data="data" :close-modal="() => {openAdd = !openAdd}" />
  </DashDialog>
  <div class="flex sm:flex-row flex-col sm:items-center justify-between space-y-2">
    <DashTitle title="Abonnements" :breadcrumb="breadcrumb" />
    <Button type="button" @click="openAdd = true">Ajouter un abonnement</Button>
  </div>
    <div>
      <DatatablesDataTable v-if="subscriptions" filter-column="name" filterPlaceholder="Filtrer par nom" :columns="columns" :data="subscriptions!"/>
    </div>
</template>

<script setup lang="ts">
import type BreadcrumbProps from "~/types/BreadcrumbProps";
import {columns} from '~/components/datatables/subscriptions/columns'
import type {SubscriptionProps} from "~/types/SubscriptionProps";

const breadcrumb = ref<BreadcrumbProps[]>([]);
const openAdd = ref(false);
const { getSubscriptions } = useSubscription();
const data = reactive<SubscriptionProps>({
  name: '',
  nb_card: 0,
  price: 0,
});

onMounted(() => {
  breadcrumb.value = [{label: 'Tableau de bord', link: '/dashboard'}, {label: 'Abonnements', link: '/dashboard/plans'}];
});

const {data: subscriptions, status} = await useAsyncData('subscriptions', getSubscriptions);

definePageMeta({
  middleware: ["admin"]
});
</script>

<style scoped>

</style>