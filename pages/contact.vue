<script setup lang="ts">
definePageMeta({
  layout: "landing",
});

</script>

<template>
  <section class="container max-auto flex flex-col items-center gap-6 sm:gap-7 py-12">
    <div class="flex flex-col gap-3 items-center">
      <div class="flex items-center justify-center rounded-xl h-16 w-16 bg-primary mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-mails text-secondary">
          <rect width="16" height="13" x="6" y="4" rx="2"></rect>
          <path d="m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7"></path>
          <path d="M2 8v11c0 1.1.9 2 2 2h14"></path>
        </svg>
      </div>
      <span class="font-bold uppercase text-primary text-center">contact us</span>
      <h2 class="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center mt-4">Have
        additional inquiries?</h2>
      <p class="text-lg text-muted-foreground text-balance sm:max-w-2xl text-center">Please complete the form below
        &amp; we'll get back to you shortly</p></div>
    <div class="text-black sm:w-1/2 bg-[black] w-[100%]">
      <form class="flex flex-col gap-4">
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Select>
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Ideas & Features">
                Ideas & Features
              </SelectItem>
              <SelectItem value="Problem & Troubleshooting">
                Problem & Troubleshooting
              </SelectItem>
              <SelectItem value="Shipping & Billing">
                Shipping & Billing
              </SelectItem>
              <SelectItem value="Collaboration & Partnershi">
                Collaboration & Partnership
              </SelectItem>
              <SelectItem value="Book a Demo Call">
                Book a Demo Call
              </SelectItem>
              <SelectItem value="Other">
                Other
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Textarea placeholder="Type your message here." />
        <button type="button" class="inline-flex items-center text-white justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 w-full mt-6 text-base">
          Submit </button>
      </form>
    </div>
  </section>
</template>

<style scoped>

</style>