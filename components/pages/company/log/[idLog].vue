<template>
  <div class="log">
    <Header title="Históricos por empresa" />
    <div class="identify-company">
      <h3>
        Empresa: <span>{{ historic.getNameCompany?.company_name }}</span>
      </h3>
      <h3 v-if="historic.getNameCompany?.cnpj">
        CNPJ: <span>{{ historic.getNameCompany?.cnpj }}</span>
      </h3>
      <h3 v-if="historic.getNameCompany?.cpf">
        CPF: <span>{{ historic.getNameCompany?.cpf }}</span>
      </h3>
    </div>
    <HistoryFlow />
  </div>
</template>

<script setup lang="ts">
import { useHistoric } from '@/stores/historic'

const route = useRoute()
const historic = useHistoric()
const company_id = Number(route.params.idLog)

onMounted(() => {
  historic.show({ company_id })
})

definePageMeta({
  middleware: ['guest']
})
</script>

<style scoped lang="scss">
.log {
  display: grid;
  gap: 2rem;

  .identify-company {
    h3 {
      color: aqua;

      span {
        color: #fff;
        font-size: 18px;
      }
    }
  }
}
</style>
