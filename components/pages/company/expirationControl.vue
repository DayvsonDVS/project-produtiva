<template>
  <div class="expiration-control">
    <Header title="Controle de vencimentos" />

    <div class="filter">
      <img src="/svg/Funnel.svg" />

      <Button color="primary" :outline="true" @click="filterContract()">
        Contrato
      </Button>

      <Button color="primary" :outline="true" @click="filterPcmso()">
        PCMSO
      </Button>

      <div class="clean-filter" ref="iconFilter">
        <img src="/svg/Arrow-repeat.svg" @click="cleanFilter()" />
      </div>
    </div>

    <CompanyExpirationControl />
  </div>
</template>

<script setup lang="ts">
import { useCompany } from '@/stores/company'
import { Button } from 'bumi-components-new'
import tippy from 'tippy.js'

const company = useCompany()
const iconFilter = ref<HTMLElement>()

onMounted(() => {
  company.fetchCompanies()

  tippy(iconFilter.value!, { content: 'Limpar filtro' })
})

onUnmounted(() => {
  cleanFilter()
})

definePageMeta({
  middleware: ['guest', 'guest-admin']
})

function filterContract() {
  cleanFilter()
  company.filterContract = 'Contract'
}

function filterPcmso() {
  cleanFilter()
  company.filterPcmso = 'Pcmso'
}

function cleanFilter() {
  company.filterPcmso = ''
  company.filterContract = ''
}
</script>

<style scoped lang="scss">
.expiration-control {
  display: grid;
  gap: 1rem;
  .filter {
    display: grid;
    grid-auto-flow: column;
    justify-content: left;
    align-items: center;
    gap: 1rem;
    img {
      width: 25px;
      display: grid;
    }
  }
  .clean-filter {
    display: flex;
    img {
      cursor: pointer;
      width: 25px;
    }
  }
}
</style>
