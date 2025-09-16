<template>
  <div class="flex sm:flex-row flex-col sm:items-center justify-between space-y-2">
    <DashTitle title="Tableau de bord" :breadcrumb="breadcrumb"/>
    <DashUserSwitcher v-if="user?.user_roles?.role?.name! === 'Admin'" :action="switchingAction"
                      :default-user="route.query.user ? route.query.user as string : undefined"/>
  </div>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card v-if="userStat && userStat.user_roles?.role?.name! === 'Admin'">
      <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium">Utilisateurs</CardTitle>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </CardHeader>
      <CardContent v-if="statUser">
        <div  class="text-2xl font-bold">{{ formatCompactNumber(statUser.totalCount!) }}
        </div>
        <p class="text-xs text-muted-foreground">+ {{ formatCompactNumber(statUser.totalDay!) }} aujourd'hui</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium">Cartes numérique</CardTitle>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <path d="M2 10h20"/>
        </svg>
      </CardHeader>
      <CardContent>
        <div v-if="statPage" class="text-2xl font-bold">{{ formatCompactNumber(statPage.totalCount!) }}
        </div>
        <p class="text-xs text-muted-foreground">+
          <template v-if="statPage">{{ formatCompactNumber(statPage.totalDay!) }}
          </template>
          aujourd'hui
        </p>
      </CardContent>
    </Card>
    <Card v-if="userStat?.user_roles?.role?.name! === 'Admin'">
      <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium">Abonements</CardTitle>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
        >
          <path
              d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
          />
        </svg>
      </CardHeader>
      <CardContent v-if="statSubscription">
        <div class="text-2xl font-bold">{{ formatCompactNumber(statSubscription.totalCount!) }}
        </div>
        <p class="text-xs text-muted-foreground">+ {{ formatCompactNumber(statSubscription.totalDay!) }} aujourd'hui</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium">Nombres de vues</CardTitle>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      </CardHeader>
      <CardContent>
        <div v-if="statView" class="text-2xl font-bold">{{ formatCompactNumber(statView.totalCount )!}}
        </div>
        <p class="text-xs text-muted-foreground">+
          <template v-if="statView">{{ formatCompactNumber(statView.totalDay )}}
          </template>
          aujourd'hui
        </p>
      </CardContent>
    </Card>
  </div>
  <div class="grid gap-4 md:grid-cols-2 grid-cols-1 lg:grid-cols-7">
    <Card class="sm:col-span-4">
      <CardHeader>
        <CardTitle>Vue d'ensemble</CardTitle>
      </CardHeader>
      <CardContent class="h-90">
        <AreaChart v-if="statViewByMonth && statViewByMonth.length > 0" :data="statViewByMonth" index="name" :categories="['total']"/>
        <div v-else class="flex  flex-col justify-center items-center w-full h-full mx-auto">
          <Annoyed class="size-10"/>
          <p>Aucune donnée disponible</p>
        </div>
      </CardContent>
    </Card>
    <Card class="sm:col-span-3">
      <CardHeader class=" border-b">
        <CardTitle>Nombre de vues par ville</CardTitle>
      </CardHeader>
      <CardContent class="h-90 pt-4">
        <ScrollArea v-if="statViewByCountry && statViewByCountry.length > 0" class="h-80 w-full">
          <div v-for="(view, index) in statViewByCountry" :key="`${view.country}-${index}`" class="border-b pb-2 flex items-center justify-start">
            <p class="text-xl font-bold">{{ view.country }} {{ view.view_count }}</p>
          </div>
        </ScrollArea>
        <div v-else class="flex  flex-col justify-center items-center w-full h-full mx-auto">
          <Annoyed class="size-10"/>
          <p>Aucune donnée disponible</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import type BreadcrumbProps from "~/types/BreadcrumbProps";
import {Annoyed} from "lucide-vue-next";
import { AreaChart } from '@/components/ui/chart-area'
import formatCompactNumber from "~/utils/formatCompactNumber";

const route = useRoute();
const router = useRouter();
const breadcrumb = ref<BreadcrumbProps[]>([]);
const {getAuthUser, getUser} = useUser();
const {
  getUserStats,
  getSubscriptionStats,
  getPageStats,
  getViewStats,
  getViewStatsByCountry,
  getViewStatsByMonth,
} = useStat();
const {data: user, status} = await useAsyncData('auth-user', getAuthUser);
const userIdUser = ref(route.query.user ? route.query.user as string : user.value?.id);
const userIdStat = ref(route.query.user ? route.query.user as string : user.value?.user_roles?.role?.name === 'Admin' ? undefined : user.value?.id);
onMounted(() => {
  breadcrumb.value = [{label: 'Tableau de bord', link: '/dashboard'}];
});

function switchingAction(id: string | undefined) {
  if (id) {
    router.push({query: {user: id}});
  } else {
    const {user, ...rest} = route.query;
    router.push({query: rest});
  }
}

const {
  data: userStat,
  refresh: refreshUserDash
} = await useAsyncData(`user-dash`, async () => getUser(userIdUser.value!), {immediate: true});
const {
  data: statSubscription,
  refresh: refreshStatSubscription
} = await useAsyncData(`stat-dash`, getSubscriptionStats);
const {data: statUser, refresh: refreshStatUser} = await useAsyncData(`stat-user`, getUserStats);

const {
  data: statPage,
  refresh: refreshStatPage
} = await useAsyncData(`stat-page`, async () => getPageStats(userIdStat.value));
const {
  data: statView,
  refresh: refreshStatView
} = await useAsyncData(`stat-view`, async () => getViewStats(userIdStat.value));
const {
  data: statViewByCountry,
  refresh: refreshStatViewByCountry
} = await useAsyncData(`stat-view-by-country`, async () => getViewStatsByCountry(userIdStat.value));
const {
  data: statViewByMonth,
  refresh: refreshStatViewByMonth
} = await useAsyncData(`stat-view-by-month`, async () => getViewStatsByMonth(userIdStat.value));

watch(() => route.query.user, async (newVal, oldVal) => {
  userIdUser.value = newVal ? newVal as string : user.value?.id!;
  userIdStat.value = newVal ? newVal as string : user.value?.user_roles?.role?.name === 'Admin' ? undefined : user.value?.id;
  await refreshUserDash();
  await refreshStatPage();
  await refreshStatView();
  await refreshStatViewByCountry();
  await refreshStatViewByMonth();
}, {immediate: true});
</script>

<style scoped></style>
