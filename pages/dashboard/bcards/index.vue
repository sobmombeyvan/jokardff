<template>
  <UtilsDialogAlert
      :is-open="openDelete"
      variant="danger"
      :set-is-open="() =>  { openDelete = !openDelete }"
      title="Confirmer la suppression"
      description="C'est définitif ! Êtes-vous sûr de vouloir supprimer cette configuration"
      :handle-action="deleteData"
      action-text="Supprimer"
      :button-loading="isLoading"
  />
  <div class="flex  sm:flex-row flex-col sm:items-center justify-between space-y-2">
    <DashTitle title="Cartes de visite numériques" :breadcrumb="breadcrumb"/>
    <div class=" flex flex-col space-y-2">
      <DashUserSwitcher v-if="userAuth?.user_roles?.role?.name! === 'Admin'" :action="switchingAction"
                        :default-user="route.query.user ? route.query.user as string : undefined"/>
      <Button type="button" @click="checkSubscription" class="w-full">Ajouter une carte</Button>
    </div>
  </div>
  <div class="max-w-5xl w-full mx-auto">
    <ClientOnly>
      <div v-if="status === 'pending'" class="flex justify-center items-center h-12 w-full">
        <Loader2 class="size-10 mr-2 animate-spin"/>
      </div>

      <div v-else-if="cards && cards.length > 0" class=" w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CardBusinessDigital
            v-for="card in cards"
            :data="card"
            :key="card.id"
            @open-delete="() => {
          cardSelected = card.id;
          openDelete = true;
        }"
        />
      </div>
      <div v-else class="flex  flex-col justify-center items-center w-full mx-auto">
        <Annoyed class="size-10"/>
        <p class="italic">Nous n'avez pas de carte</p>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type BreadcrumbProps from "~/types/BreadcrumbProps";
import {Annoyed, Loader2} from "lucide-vue-next";
import {toast} from "~/components/ui/toast";

const router = useRouter();
const route = useRoute();
const breadcrumb = ref<BreadcrumbProps[]>([]);
const {getAuthUser, getUser} = useUser();
const {getPagesByUser, deletePage} = usePage();
const isLoading = ref(false);
const openDelete = ref(false);
const cardSelected = ref<string | undefined>(undefined);

onMounted(() => {
  breadcrumb.value = [{label: 'Tableau de bord', link: '/dashboard'}, {
    label: 'Carte de visite',
    link: '/dashboard/bcards'
  }];
});
const {data: userAuth} = await useAsyncData('auth-user', getAuthUser);

const userId = ref(route.query.user ? route.query.user as string : userAuth.value?.id!);

const {data: user, refresh: refreshUser} = await useAsyncData(`user-page`, async () => getUser(userId.value));
const {
  data: cards,
  status,
  refresh: refreshCard
} = await useAsyncData('page-by-user', async () => await getPagesByUser(userId.value), {immediate: false});

async function deleteData() {
  if (cardSelected.value) {
    isLoading.value = true;
    await deletePage(cardSelected.value!);
    await refreshCard();
    isLoading.value = false;
    openDelete.value = false;
  }
}

function switchingAction(id: string | undefined) {
  if (id) {
    router.push({query: {user: id}});
  } else {
    router.push({query: {}});
  }
}

function checkSubscription() {
  if (cards.value?.length && user.value?.subscription?.nb_card) {
    if (cards.value?.length >= user.value?.subscription?.nb_card) {
      toast({
        title: 'Mettre à niveau votre abonement',
        description: 'Vous avez atteint le nombre maximun de carte',
      });
    } else {
      router.push(`/dashboard/bcards/add${route.query.user ? '?user=' + route.query.user : ''}`);
    }
  }else if(cards.value?.length === 0) {
    router.push(`/dashboard/bcards/add${route.query.user ? '?user=' + route.query.user : ''}`);
  }
}

watch(() => route.query.user, async (newVal, oldVal) => {
  userId.value = newVal ? newVal as string : userAuth.value?.id!;
  await refreshUser();
  await refreshCard();
}, {immediate: true});
</script>

<style scoped>

</style>