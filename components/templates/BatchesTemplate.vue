<template>
  <div class="batches-template">
    <Button color="primary" @click="navigateTo('/company')">Empresas</Button>

    <div>
      <Button color="primary" @click="navigateTo('/batch/create')">+</Button>
      <Form :form="form">
        <Field name="searchable" placeholder="Pesquisar lote">
          <template v-slot:prepend>
            <img src="@/svg/magnifier.svg" />
          </template>
        </Field>
      </Form>
    </div>

    <BatchTable />
  </div>
</template>

<script setup lang="ts">
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useBatch } from '@/stores/batch'

const batch = useBatch()

const form = darpi.newForm({
  searchable: darpi.string().required()
})

form.values.watch('searchable', (value) => {
  batch.searchable = value
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
