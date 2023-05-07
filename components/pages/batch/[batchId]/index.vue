<template>
  <div class="management">
    <Header title="Gerencimanto de Lotes" route="/" />

    <div class="location-lote">
      <span>{{ batch.batch.name }}</span>
    </div>

    <div class="overview-card">
      <div class="card">
        <img src="@/svg/Graphic-green.svg" />
        <div>
          <span>{{ batchManagement.done }}</span>
          Concluídas
        </div>
      </div>

      <div class="card">
        <img src="@/svg/Graphic-red.svg" />
        <div>
          <span>{{ batchManagement.pending }}</span>
          Pendentes
        </div>
      </div>
    </div>

    <CompanyManagementTable />
  </div>
</template>

<script setup lang="ts">
import { useBatchManagement } from '@/stores/batchManagement'
import { useBatch } from '@/stores/batch'

const batch = useBatch()
const batchManagement = useBatchManagement()
const route = useRoute()
const id = Number(route.params.batchId)

onMounted(() => {
  batch.show({ id })
  batchManagement.show({ id })
})
</script>

<style scoped lang="scss">
.management {
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  .location-lote {
    display: grid;
    justify-self: center;
    color: #fff;
    background: #282c36;
    width: max-content;
    padding: 1rem;
    border-radius: 12px;
  }
  .overview-card {
    display: grid;
    grid-auto-flow: column;
    color: #ced1db;
    gap: 1rem;
    .card {
      background: #282c36;
      border-radius: 12px;
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      justify-content: left;
      gap: 4rem;
      padding: 12px;
      img {
        cursor: pointer;
      }
      div {
        display: grid;
        justify-items: center;
      }
    }
  }
  .table .tbody .column .button {
    margin-right: 12px;
  }
  .table .tbody .column {
    align-items: center;
    .receipt {
      background: none;
      width: 100px;
      border-radius: 12px;
      border: dotted;
      padding: 8px;
      display: grid;
      justify-content: left;
      color: #ced1db;
      gap: 0.5rem;
      grid-auto-flow: column;
      font-size: 10px;
      cursor: pointer;
    }
  }
}
</style>
