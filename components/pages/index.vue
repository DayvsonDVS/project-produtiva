<template>
  <BatchesTemplate />
</template>

<script setup lang="ts">
import { useBatch } from '@/stores/batch'
import { useCompany } from '@/stores/company'
import { useBatchManagement } from '@/stores/batchManagement'

definePageMeta({
  middleware: 'guest'
})

const batch = useBatch()
const company = useCompany()
const batchManagement = useBatchManagement()

batchManagement.removeBatchCompanies = []

onMounted(() => {
  batch.fetchLots()
  company.fetchCompanies()
})
</script>
