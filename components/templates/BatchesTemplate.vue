<template>
  <div class="batches-template">
    <Button color="primary" @click="navigateTo('/company')"
      >Adicionar Empresa</Button
    >

    <div>
      <Button color="primary">+</Button>
      <Form :form="form">
        <Field name="search" placeholder="Pesquisar lote" />
      </Form>
    </div>

    <Table :columns="['ID', 'Lote', 'Status', 'Ação']" striped>
      <Row v-for="{ id, name, status } in batch.lots" :uid="id">
        <Column>{{ id }} </Column>
        <Column>{{ name }} </Column>
        <Column>
          <div>
            {{ status }}
            <img v-if="status === 'Pendente'" src="@/svg/X-red.svg" />
            <img v-if="status === 'Concluido'" src="@/svg/V-check.svg" />
          </div>
        </Column>
        <Column>
          <Button color="primary">Editar</Button>
          <Button color="success">Gerenciar</Button>
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useBatch } from '@/stores/batch'

const batch = useBatch()

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
  .field {
    :deep(span) {
      font-size: 18px;
    }
    :deep(.input-container) {
      background: #1c2029;
      border-radius: 12px;
      color: #838692;
      input {
        width: auto;
      }
    }
  }
  .table .tbody .column .button {
    margin-right: 12px;
  }
  .table .tbody .column {
    align-items: center;
  }
}
</style>
