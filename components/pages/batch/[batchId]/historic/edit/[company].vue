<template>
  <HistoricTemplate />
</template>

<script setup lang="ts">
import { useBatchManagement } from '@/stores/batchManagement'

const route = useRoute()
const batchManagement = useBatchManagement()

onMounted(() => {
  batchManagement.show({ id: Number(route.params.batchId) })
  batchManagement.idCompany = Number(route.params.company)
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
