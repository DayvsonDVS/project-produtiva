<template>
  <div class="batch-edit">
    <Header title="Alterar Lote" route="/" />

    <BatchFormEdit />
  </div>
</template>

<script setup lang="ts">
import { useBatch } from '@/stores/batch'
import { useBatchManagement } from '@/stores/batchManament'

const route = useRoute()
const batch = useBatch()
const batchManagement = useBatchManagement()
const id = Number(route.params.id)
batchManagement.removeBatchCompanies = []

onMounted(() => {
  batch.show({ id })
  batchManagement.show({ id })
})
</script>

<style scoped lang="scss">
.batch-edit {
  display: grid;
  gap: 1rem;
}
</style>
