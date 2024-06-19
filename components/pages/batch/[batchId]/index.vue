<template>
  <div class="management">
    <Header title="Gerenciamanto de Lotes" route="/" />

    <div class="location-lote">
      <span>{{ batch.batch.name }}</span>
    </div>

    <div ref="productionCard" class="yey-overview">
      <img ref="iconEye" :src="activeOverview ? '/svg/Eye.svg' : '/svg/Eye-slash.svg'" @click="isActive()" />
      <div v-if="activeOverview" class="overview-production">
        <h2>Produção</h2>

        <ProductionTable />
      </div>

      <div class="filters">
        <img ref="iconRocket" src="/svg/Rocket.svg" @click="filterRocket()">
        <img ref="target" src="/svg/Arrows-move.svg" @click="filterReceiptCompany()" />
        <img ref="iconFilter" src="/svg/Arrow-repeat.svg" @click="cleanFilter()" />
      </div>
    </div>

    <div class="overview-card">
      <div class="card">
        <img src="/svg/Graphic-green.svg" @click="filter('done')" />
        <div>
          <span>{{ batchManagement.done }}</span>
          Concluídas
        </div>
      </div>

      <div class="card">
        <img src="/svg/Graphic-red.svg" @click="filter('pending')" />
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
import { useCompany } from '@/stores/company'
import tippy from 'tippy.js'

const batch = useBatch()
const batchManagement = useBatchManagement()
const company = useCompany()
const iconFilter = ref<HTMLElement>()
const iconRocket = ref<HTMLElement>()
const productionCard = ref<HTMLElement>()
const target = ref<HTMLElement>()
const route = useRoute()
const id = Number(route.params.batchId)
const activeOverview = ref<boolean>(false)
const iconEye = ref<HTMLElement>()

definePageMeta({
  middleware: 'guest'
})

onMounted(() => {
  batch.show({ id })
  batchManagement.show({ id })
  company.fetchCompanies()

  cleanFilter()

  tippy(iconFilter.value!, { content: 'Limpar filtro' })
  tippy(iconEye.value!, { content: 'Visualizar Produção' })
  tippy(iconRocket.value!, { content: 'Filtro aguardando' })
  tippy(target.value!, { content: 'Filtro envio de comprovante' })
})

onUnmounted(() => {
  batchManagement.pending = 0
  batchManagement.done = 0
})

onOutsideClick(productionCard, () => {
  activeOverview.value = false
})

function filter(status: string) {
  batchManagement.statusCompany = status
}

function cleanFilter() {
  batchManagement.statusCompany = 'all'
  batchManagement.filterReceipt = false
  batchManagement.filterRocket = false
  batchManagement.show({ id })
}

function isActive() {
  activeOverview.value = !activeOverview.value
}
function filterRocket() {
  batchManagement.filterReceipt = false
  batchManagement.filterRocket = true
}

function filterReceiptCompany() {
  batchManagement.filterRocket = false
  batchManagement.filterReceipt = true
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

  .yey-overview {
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
    justify-content: space-between;
    padding: 12px;

    img {
      cursor: pointer;
      width: 28px;
    }

    .filters {
      display: grid;
      grid-auto-flow: column;
      gap: 1rem;
    }
  }

  .overview-production {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 450px;
    min-height: 450px;
    z-index: 10;
    border-radius: 5%;
    padding: 18px 10px 18px;
    display: grid;
    grid-template-rows: max-content;
    justify-items: center;
    align-items: center;
    background: rgb(2, 106, 136);
    background: radial-gradient(circle,
        rgba(2, 106, 136, 1) 37%,
        rgba(25, 26, 28, 1) 130%);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.18);

    h2 {
      color: #fff;
    }
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
