<template>
  <HistoricTemplate />
</template>

<script setup lang="ts">
import { useBatchManagement } from '@/stores/batchManagement'
import { useCompany } from '@/stores/company'
import { useHistoric } from '@/stores/historic'

const route = useRoute()
const batchManagement = useBatchManagement()

const company = useCompany()
const historic = useHistoric()

onMounted(() => {
  batchManagement.show({ id: Number(route.params.batchId) })
  batchManagement.idCompany = Number(route.params.company)

  company.show({ id: batchManagement.idCompany })
  company.fetchCompanies()
  historic.show({ company_id: Number(route.params.company) })
})

definePageMeta({
  middleware: 'guest'
})
</script>

<style scoped lang="scss">
.historic-slug {
  width: 900px;
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
}
</style>
