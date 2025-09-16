<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Demo Notice -->
    <div class="bg-blue-600 text-white text-center py-2 px-4">
      <p class="text-sm font-medium">
        🎉 Demo Mode - Jokard App is Working!
      </p>
    </div>
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">Welcome to Jokard</h1>
      <p class="text-center text-lg mb-8">Digital Business Card Platform</p>
      
      <div class="text-center space-y-4">
        <NuxtLink 
          to="/dashboard" 
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors block"
        >
          Go to Dashboard
        </NuxtLink>
        
        <NuxtLink 
          to="/test" 
          class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors block"
        >
          Test Page
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

// Redirect to dashboard after 5 seconds
onMounted(() => {
  setTimeout(() => {
    navigateTo('/dashboard');
  }, 5000);
});
</script>

<style>

</style>
