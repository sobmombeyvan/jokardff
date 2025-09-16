  <template>
  <DashDialog
      :is-open="openPay"
      :set-is-open="() => {openPay = !openPay}"
      title="Paiement"
      :description="`
            Vous avez selectionnez l'abonement
            ${subscriptionSelected?.name} \n
            montant à payer:
            ${ subscriptionSelected?.price! > user?.subscription?.price! ? subscriptionSelected?.price! - user?.subscription?.price! : '0' }$
            Entrez les informations et cliquez sur payer`"
    >
      <FormPayment :close-modal="() => { openPay = false; }" />
  </DashDialog>
  <div class="flex items-center justify-between space-y-2">
    <DashTitle title="Paramètres du compte" :breadcrumb="breadcrumb"/>
  </div>
  <div class="max-w-3xl w-full mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          Modifiez vos informations personnelles et cliquez sur enregister.
        </CardDescription>
      </CardHeader>
      <form @submit="onSubmit">
        <CardContent class="w-full md:space-y-6 space-y-4 ">
          <div class="grid md:grid-cols-2 gap-4 ">
            <FormField v-slot="{ componentField }" name="firstname">
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input type="text" required placeholder="Marc" v-bind="componentField"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="lastname">
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input type="text" required placeholder="Dupont" v-bind="componentField"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            </FormField>
          </div>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" disabled required placeholder="marcdupont@jokard.com" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <Input type="text" required placeholder="14033997612" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter class="border-t px-6 py-4">
          <Button type="submit" :disabled="isSubmitting">
            <template v-if="isSubmitting">
              <Loader2 class="size-4 mr-2 animate-spin"/>
              Enregistrement
            </template>
            <template v-else>
              Enregistrer
            </template>
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
  <div class="max-w-3xl w-full mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>Abonnement</CardTitle>
        <CardDescription>
          Changez votre abonnement à tout moment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="user" class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <CardSubscription  v-if="!user!.subscription?.is_public"
                             :subscription="user!.subscription" :user="user!"
                            :selected="user!.subscription"/>
          <CardSubscription v-else @click="() => {
            if(user?.subscription_id !== subscription.id){
              subscriptionSelected = subscription;
            }
          }" v-for="subscription in subscriptions"
                            :key="subscription.id" :subscription="subscription" :user="user!"
                            :selected="subscriptionSelected"/>
        </div>
      </CardContent>
      <CardFooter class="border-t px-6 py-4">
        <Button
          type="button"
          @click="openPayModal"
          :disabled="!user!.subscription?.is_public"
        >Changer</Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type BreadcrumbProps from "~/types/BreadcrumbProps";
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {useForm} from "vee-validate";
import {schemaUpdateProfile} from "~/utils/schema/updateProfile";
import {Loader2} from "lucide-vue-next";
import type {SubscriptionProps} from "~/types/SubscriptionProps";
import {toast} from "~/components/ui/toast";

const breadcrumb = ref<BreadcrumbProps[]>([]);
const openPay = ref(false);
const subscriptionSelected = ref<SubscriptionProps | undefined>(undefined);
const {getAuthUser, updateUserProfile} = useUser();
const {getPublicSubscriptions} = useSubscription();
onMounted(() => {
  breadcrumb.value = [{label: 'Tableau de bord', link: '/dashboard'}, {
    label: 'Paramètres',
    link: '/dashboard/settings'
  }];
});
const {data: subscriptions} = useAsyncData('public-subscriptions', getPublicSubscriptions);
const {data: user, refresh: refreshUser} = useAsyncData('auth-user', getAuthUser);
const {handleSubmit, isSubmitting} = useForm({
  validationSchema: schemaUpdateProfile,
  initialValues: {
    firstname: user.value?.firstname,
    lastname: user.value?.lastname,
    email: user.value?.email,
    phone: user.value?.phone,
  },
});

const openPayModal = () => {
  if(subscriptionSelected.value){
    openPay.value = true;
  }else{
    toast({
      title: 'Oh, oh ! Quelque chose a mal tourné.',
      description: 'Veuillez selectionner un abonement',
    });
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (user.value) {
    await updateUserProfile({
      ...values,
      status: true
    }, user.value.id);
    await refreshUser();
  }
});
</script>

<style scoped>

</style>