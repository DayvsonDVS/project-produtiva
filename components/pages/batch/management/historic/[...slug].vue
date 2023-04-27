<template>
  <HistoricTemplate />
</template>

<script async setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { useBatchManagement } from '@/stores/batchManagement'

const route = useRoute()
const batchManagement = useBatchManagement()

onMounted(() => {
  //batch id
  const id = Number(route.params.slug[0])

  batchManagement.show({ id })

  batchManagement.batchManagement = batchManagement.batchManagements.find(
    (company) => {
      return company.company_id === Number(route.params.slug[1])
    }
  )!
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
