<template>
  <div class="company-template">
    <Header title="Pesquisar Empresa" route="/">
      <div class="filter">
        <img
          src="/svg/Filter-square.svg"
          ref="filter"
          @click="navigateTo('/company/expirationControl')"
        />
      </div>
    </Header>

    <Form class="search-form" :form="form">
      <Button color="primary" @click="navigateTo('/company/companyCreate')"
        >+</Button
      >

      <Field name="searchable" placeholder="Pesquisar empresa">
        <template v-slot:prepend>
          <img src="/svg/magnifier.svg" />
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
import tippy from 'tippy.js'

const filter = ref<HTMLElement>()
const company = useCompany()

const form = darpi.newForm({
  searchable: darpi.string().required()
})

form.values.watch('searchable', (value) => {
  company.searchable = value
})

onMounted(() => {
  tippy(filter.value!, { content: 'Controle de vencimentos' })
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
