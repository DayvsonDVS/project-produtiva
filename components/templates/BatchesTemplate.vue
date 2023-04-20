<template>
  <div class="batches-template">
    <Button color="primary" @click="navigateTo('/company')">Empresas</Button>

    <div>
      <Button color="primary" @click="navigateTo('/batch/create')">+</Button>
      <Form :form="form">
        <Field name="search" placeholder="Pesquisar lote" />
      </Form>
    </div>

    <BatchTable />
  </div>
</template>

<script setup lang="ts">
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'

const form = darpi.newForm({
  search: darpi.string().required()
})
</script>

<style scoped lang="scss">
.batches-template {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
  .button {
    width: auto;
  }
  div {
    display: grid;
    align-items: center;
    justify-content: left;
    gap: 1rem;
    grid-auto-flow: column;
    font-size: 18px;
  }
}
</style>
