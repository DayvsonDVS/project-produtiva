<template>
  <div class="batch-edit">
    <Header title="Alterar Lote" route="/" />

    <BatchFormEdit />
  </div>
</template>

<script setup lang="ts">
import { useBatch } from '@/stores/batch'
import { useBatchManagement } from '@/stores/batchManagement'
import { useCompany } from '@/stores/company'

const route = useRoute()
const batch = useBatch()
const companies = useCompany()
const batchManagement = useBatchManagement()
const id = Number(route.params.id)

batchManagement.removeBatchCompanies = []
batchManagement.addBatchCompanies = []

onMounted(() => {
  batch.show({ id })
  batchManagement.show({ id })
  companies.fetchCompanies()
  companies.fetchBatchCompaniesShow({ id })
})

definePageMeta({
  middleware: 'guest'
})
</script>

<style scoped lang="scss">
.batch-edit {
  display: grid;
  gap: 1rem;
}
</style>
