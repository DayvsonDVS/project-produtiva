<template>
  <BatchesTemplate />
</template>

<script setup lang="ts">
import { useBatch } from '@/stores/batch'
import { useCompany } from '@/stores/company'

const batch = useBatch()
const company = useCompany()

onMounted(() => {
  batch.fetchLots()
  company.fetchCompanies()
})
</script>
