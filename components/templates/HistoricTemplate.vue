<template>
  <div class="historic-template">
    <Header title="Editar Histórico" />

    <div class="location-company">
      <span>{{ batchManagement.getCompany?.name }}</span>
      <br />
      <span v-if="batchManagement.getCompany?.cnpj"
        >CNPJ: {{ batchManagement.getCompany?.cnpj }}</span
      >
      <span v-if="batchManagement.getCompany?.cpf"
        >CPF: {{ batchManagement.getCompany?.cpf }}</span
      >
      <br />
      <span v-if="batchManagement.getCompany?.contract_date"
        >Contrato: {{ batchManagement.getCompany?.contract_date }}</span
      >
      <br />
      <span v-if="batchManagement.getCompany?.email"
        >E-mail: {{ batchManagement.getCompany?.email }}</span
      >
      <br />
      <span v-if="batchManagement.getCompany?.contact"
        >Telefone: {{ batchManagement.getCompany?.contact }}</span
      >
    </div>

    <div
      v-show="hasPassedOneYear(batchManagement.getCompany?.validity_pcmso!)"
      class="notification"
    >
      <img src="/svg/Exclamation-triangle.svg" ref="exclamation" />
    </div>

    <div class="alert" v-if="company.company.alert !== ''">
      <span>{{ company.company.alert }}</span>
    </div>

    <HistoricForm />
  </div>
</template>

<script setup lang="ts">
import { useBatchManagement } from '@/stores/batchManagement'
import { useCompany } from '@/stores/company'
import tippy from 'tippy.js'

const batchManagement = useBatchManagement()
const company = useCompany()
const exclamation = ref<HTMLElement>()

onMounted(() => {
  tippy(exclamation.value!, { content: 'Programa Vencido' })
})
</script>

<style scoped lang="scss">
.historic-template {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
  .alert {
    color: blue;
    font-weight: 800;
    font-size: 20px;
  }
  .notification {
    display: grid;
    justify-content: end;
    img {
      width: 25px;
    }
  }
  .location-company {
    display: grid;
    justify-self: center;
    color: #fff;
    background: #282c36;
    padding: 1rem;
    border-radius: 12px;
    border: solid #018ffb;
    justify-items: center;
  }
}
</style>
