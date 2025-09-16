<template>
  <DashDialog :is-open="openAdd" :set-is-open="() => {openAdd = !openAdd}" title="Ajouter" description="Entrez les informations et cliquez sur enregistrer">
    <FormAddUser :close-modal="() => {openAdd = false}" />
  </DashDialog>
  <div class="flex items-center justify-between space-y-2">
    <DashTitle title="Utilisateurs" :breadcrumb="breadcrumb"/>
    <Button type="button" @click="openAdd = true" v-if="false">Ajouter un utilisateur</Button>
  </div>
  <div>
    <DatatablesDataTable v-if="data" filter-column="email" filterPlaceholder="Filtrer par email" :columns="columns" :data="data"/>
  </div>
</template>

<script setup lang="ts">
import type BreadcrumbProps from "~/types/BreadcrumbProps";
import {columns} from '~/components/datatables/users/columns';

const openAdd = ref(false);
const breadcrumb = ref<BreadcrumbProps[]>([]);
const { getUsers } = useUser();

onMounted(() => {
  breadcrumb.value = [{label: 'Tableau de bord', link: '/dashboard'}, {
    label: 'Utilisateurs',
    link: '/dashboard/users'
  }];
});

const {data, status} = await useAsyncData('users', getUsers);

definePageMeta({
  middleware: ["admin"]
});
</script>

<style scoped>

</style>