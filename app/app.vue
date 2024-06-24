<script setup lang="ts">
const prompt = ref('')
const loading = ref(false)
const printing = ref(false)
const img = ref<string>('')

async function generate() {
  loading.value = true
  if (!prompt.value) {
    loading.value = false
    return
  }

  const response = await $fetch('/c', {
    method: 'GET',
    params: {
      prompt: prompt.value,
    },
  })
  loading.value = false
  img.value = response as string
}

function print() {
  printing.value = true
  setTimeout(() => {
    window.print()
    printing.value = false
  }, 100)
}
</script>

<template>
  <div class="antialiased m-4">
    <NuxtRouteAnnouncer />
    <div v-if="!printing" class="flex flex-row gap-2 mb-4">
      <UInput
        v-model="prompt"
        type="text"
        icon="i-heroicons-photo"
        size="xl"
        class="w-[936px]"
      />
      <UButton label="Kreiere" size="xl" @click="generate" :loading="loading" />
    </div>
    <img v-if="img" :src="img" alt="coloring page" />
    <UButton
      v-if="img && !printing"
      label="Drucken"
      @click="print"
      size="xl"
      class="mt-4"
    />
  </div>
</template>
