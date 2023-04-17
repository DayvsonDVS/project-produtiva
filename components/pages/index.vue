<template>
  <BatchesTemplate />
</template>

<script setup lang="ts">
import { useBatch } from '@/stores/batch'

const batch = useBatch()

onMounted(() => {
  batch.fetchLots()
})
</script>
