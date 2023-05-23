<template>
  <CompanyTemplate />
</template>

<script setup lang="ts">
import { useCompany } from '@/stores/company'

const company = useCompany()

onMounted(() => {
  company.fetchCompanies()
})

onUnmounted(() => {
  company.searchable = ''
})

definePageMeta({
  middleware: ['guest', 'guest-admin']
})
</script>
