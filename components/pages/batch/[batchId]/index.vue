<template>
  <div class="management">
    <Header title="Gerencimanto de Lotes" route="/" />

    <div class="location-lote">
      <span>{{ batch.batch.name }}</span>
    </div>

    <div class="clean-filter" ref="iconFilter">
      <img src="@/svg/Arrow-repeat.svg" @click="cleanFilter()" />
    </div>

    <div class="overview-card">
      <div class="card">
        <img src="@/svg/Graphic-green.svg" @click="filter('done')" />
        <div>
          <span>{{ batchManagement.done }}</span>
          Concluídas
        </div>
      </div>

      <div class="card">
        <img src="@/svg/Graphic-red.svg" @click="filter('pending')" />
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
import tippy from 'tippy.js'

const batch = useBatch()
const batchManagement = useBatchManagement()
const iconFilter = ref<HTMLElement>()
const route = useRoute()
const id = Number(route.params.batchId)

definePageMeta({
  middleware: 'guest'
})

onMounted(() => {
  batch.show({ id })
  batchManagement.show({ id })

  tippy(iconFilter.value!, { content: 'Limpar filtro' })
})

function filter(status: string) {
  batchManagement.statusCompany = status
}

function cleanFilter() {
  batchManagement.statusCompany = 'all'
}
</script>

<style scoped lang="scss">
.management {
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  .location-lote {
    display: grid;
    justify-self: center;
    color: #fff;
    background: #282c36;
    width: max-content;
    padding: 1rem;
    border-radius: 12px;
    border: solid #018ffb;
  }
  .clean-filter {
    display: flex;
    justify-self: end;
    padding-right: 12px;
    img {
      cursor: pointer;
      width: 25px;
    }
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
        border-radius: 18px;
        cursor: pointer;
        &:hover {
          box-shadow: 2px 2px 18px white;
        }
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
