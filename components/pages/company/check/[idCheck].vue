<template>
  <div class="check">
    <Header title="Parâmetros por empresa" />
    <div class="identify-company">
      <h3>
        Empresa: <span>{{ company.company?.name }}</span>
      </h3>
      <h3 v-if="company.company?.cnpj">
        CNPJ: <span>{{ company.company?.cnpj }}</span>
      </h3>
      <h3 v-if="company.company?.cpf">
        CPF: <span>{{ company.company?.cpf }}</span>
      </h3>
    </div>
    <ParametersCompany />
  </div>
</template>

<script setup lang="ts">
import { useCompany } from '@/stores/company'

const route = useRoute()
const company = useCompany()
const id = Number(route.params.idCheck)

onMounted(() => {
  company.show({ id })
})

definePageMeta({
  middleware: ['guest', 'guest-admin']
})
</script>

<style scoped lang="scss">
.check {
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
