<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'
import {PinInput, PinInputGroup, PinInputInput,} from '@/components/ui/pin-input'
import {Loader2} from "lucide-vue-next";
import {useForm} from 'vee-validate';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Button} from "~/components/ui/button";
import {verifyOTP} from "~/utils/schema/verifyOTP";
import {toast, ToastAction} from "~/components/ui/toast";

const route = useRoute();
const user = useSupabaseUser();
const isConfirm = ref(true);
const {verifyOtp, isLoading} = useAuth();

onMounted(() => {
  if (route.query.code) {
    isConfirm.value = false;
  }else if(route.query.error) {
    navigateTo('/login');
    toast({
      title: 'Oh, oh ! Quelque chose a mal tourné.',
      description: 'Veuillez recommencer le processus de connexion',
      variant: 'destructive'
    });
  }
});

watch(user, () => {
  if (user.value) {
    return navigateTo('/dashboard');
  }
}, {immediate: true});

const {handleSubmit, setFieldValue} = useForm({
  validationSchema: verifyOTP,
});

const onSubmit = handleSubmit(({pin}) => {
  verify(pin.join(''));
});

const handleComplete = (e: string[]) => verify(e.join(''));

async function verify(code: string) {
  if (route.query.email) {
    verifyOtp(code, route.query.email.toString().trim())
  } else {
    toast({
      title: 'Oh, oh ! Quelque chose a mal tourné.',
      description: 'Veuillez recommencer le processus de connexion',
      action: h(ToastAction, {
        altText: 'Se Connecter',
        onClick: () => navigateTo('/login')
      }, {
        default: () => 'Se Connecter',
      }),
    });
  }
}

definePageMeta({
  layout: "credential",
});
</script>

<template>
  <Card v-if="isConfirm" class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        Verification
      </CardTitle>
      <CardDescription>
        Entrez le code à 6 chiffres ci-dessous pour verifier votre identité
      </CardDescription>
    </CardHeader>
    <CardContent class="pb-4">
      <form class="space-y-6 mx-auto" @submit="onSubmit">
        <FormField v-slot="{ componentField, value }" name="pin">
          <FormItem>
            <FormLabel>OTP</FormLabel>
            <FormControl>
              <PinInput
                  id="pin-input"
                  :model-value="value"
                  placeholder="○"
                  class="flex gap-2 w-full items-center mt-1"
                  otp
                  type="number"
                  :name="componentField.name"
                  @complete="handleComplete"
                  @update:model-value="(arrStr) => {
                    setFieldValue('pin', arrStr.filter(Boolean))
                  }"
              >
                <PinInputGroup class="w-full">
                  <PinInputInput
                      v-for="(id, index) in 6"
                      :key="id"
                      :index="index"
                      class="w-full"
                  />
                </PinInputGroup>
              </PinInput>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>

        <Button :disabled="isLoading" class="w-full" type="submit">
          <template v-if="isLoading">
            <Loader2 class="size-4 mr-2 animate-spin"/>
            Verification
          </template>
          <template v-else>
            Verifier
          </template>
        </Button>
      </form>
    </CardContent>
  </Card>
  <div v-else class="flex flex-col justify-center gap-4 items-center">
    <h1 class="md:text-4xl text-2xl font-bold">
      Connexion en cours...
    </h1>
    <Loader2 class="size-10 mr-2 animate-spin"/>
  </div>
</template>