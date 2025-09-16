<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Separator} from '@/components/ui/separator'
import {Loader2, Frown} from 'lucide-vue-next'

const route = useRoute();
const user = useSupabaseUser();
const isBlock = ref(false);
const isLogin = ref(false);
const email = ref('');

const {signInWithOtp, isLoading, signInWithGoogle} = useAuth();

onMounted(() => {
  if (route.query.status && route.query.status === 'false') {
    isBlock.value = true;
  }
});

watch(user, () => {
  if (user.value) {
    isLogin.value = true;
    return navigateTo('/dashboard')
  }
}, {immediate: true});

definePageMeta({
  layout: "credential",
});
</script>

<template>
  <div v-if="isLogin" class="flex flex-col justify-center gap-4 items-center">
    <h1 class="md:text-4xl text-2xl font-bold">
      Connexion en cours...
    </h1>
    <Loader2 class="size-10 mr-2 animate-spin"/>
  </div>
  <Card v-else class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        Bienvenue sur Jokard
      </CardTitle>
      <CardDescription>
        Entrez votre email ci-dessous pour vous connecter à Jokard
      </CardDescription>
      <p v-if="isBlock" class="bg-yellow-50 text-yellow-600 p-2 text-sm rounded w-full">
        <Frown class="size-4"/> Désolé votre compte a été désactivé, veuillez <NuxtLink to="/contact" class="underline">contacter un administrateur</NuxtLink>
      </p>
    </CardHeader>
    <CardContent class="pb-4">
      <form class="grid gap-4" @submit.prevent="signInWithOtp(email)">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              v-model="email"
          />
        </div>
        <Button type="submit" :disabled="isLoading" class="w-full">
          <template v-if="isLoading">
            <Loader2 class="size-4 mr-2 animate-spin"/>
            Connexion
          </template>
          <template v-else>
            Se connecter
          </template>
        </Button>
      </form>
    </CardContent>
    <Separator/>
    <CardFooter class="pt-4">
      <Button type="button" :disabled="isLoading" @click="signInWithGoogle" class="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48" class="mr-1">
          <path fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
          <path fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
          <path fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
          <path fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
        Continuer avec google
      </Button>
    </CardFooter>
  </Card>
</template>