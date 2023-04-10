<template>
  <div class="batch">
    <Button color="primary">Adicionar Empresa</Button>

    <div>
      <Button color="primary">+</Button>
      <Form :form="form">
        <Field name="search" placeholder="Pesquisar lote" />
      </Form>
    </div>

    <Table :columns="['ID', 'Lote', 'Status', 'Ação']" striped>
      <Row uid="1">
        <Column>1 </Column>
        <Column>Janeiro - 2023 </Column>
        <Column>
          <div>Pendente <img src="@/svg/X-red.svg" /></div>
        </Column>
        <Column>
          <Button color="primary">Editar</Button>
          <Button color="success">Gerenciar</Button>
        </Column>
      </Row>

      <Row uid="2">
        <Column>2 </Column>
        <Column>Fevereiro - 2023 </Column>
        <Column>
          <div>Concluído <img src="@/svg/V-check.svg" /></div>
        </Column>
        <Column
          ><Button color="primary">Editar</Button>
          <Button color="success">Gerenciar</Button>
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'

const form = darpi.newForm({
  search: darpi.string().required()
})
</script>

<style scoped lang="scss">
.batch {
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
