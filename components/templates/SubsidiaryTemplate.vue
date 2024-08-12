<template>
  <div class="subsidiary-template">
    <Header title="Pesquisar Unidade">
    </Header>

    <Form class="search-form" :form="form">
      <Button color="primary" @click="navigateTo(`/company/${idCompanySubsidiary}/subsidiaryCreate/`)">+</Button>

    </Form>

    <SubsidiaryTable />
  </div>
</template>

<script setup lang="ts">
import { Button } from 'bumi-components-new'
import { Form, darpi } from '@cataline.io/darpi'
import { useCompany } from '@/stores/company'

const company = useCompany()
const route = useRoute()
const idCompanySubsidiary = Number(route.params.idCompanySubsidiary)

const form = darpi.newForm({
  searchable: darpi.string().required()
})

form.values.watch('searchable', (value) => {
  company.searchable = value
})


</script>

<style scoped lang="scss">
.company-template {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
  grid-auto-flow: row;

  .header {
    display: grid;
    align-items: center;

    .filter {
      img {
        cursor: pointer;
        width: 30px;

        &:hover {
          box-shadow: inset 5px 10px 18px white;
        }
      }
    }
  }

  form {
    display: grid;
    grid-template-columns: 1rem 1fr;
    gap: 2rem;
    justify-content: left;
  }
}
</style>
