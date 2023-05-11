<template>
  <div class="company-template">
    <Header title="Pesquisar Empresa" route="/" />

    <Form class="search-form" :form="form">
      <Button color="primary" @click="navigateTo('/company/companyCreate')"
        >+</Button
      >

      <Field name="searchable" placeholder="Pesquisar serviço">
        <template v-slot:prepend>
          <img src="@/svg/magnifier.svg" />
        </template>
      </Field>
    </Form>

    <CompanyTable />
  </div>
</template>

<script setup lang="ts">
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useCompany } from '@/stores/company'

const company = useCompany()

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
  form {
    display: grid;
    grid-template-columns: 1rem 1fr;
    gap: 2rem;
    justify-content: left;
  }
}
</style>
