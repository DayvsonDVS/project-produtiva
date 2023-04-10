<template>
  <div class="batch-edit">
    <div class="header">
      <h2>Editar Lote</h2>
      <img src="@/svg/Close-Button.svg" alt="" />
    </div>

    <div>
      <span>Empresas </span>
      <Button color="primary">+</Button>
    </div>

    <Table :columns="['ID', 'Empresa', 'Ação']" striped @submit="send">
      <Row uid="1">
        <Column>1 </Column>
        <Column>Jc Congelados LTDA </Column>
        <Column><Button color="danger">Remover</Button></Column>
      </Row>
      <Row uid="2">
        <Column>2 </Column>
        <Column>Ekimar Alimentos LTDA </Column>
        <Column><Button color="danger">Remover</Button></Column>
      </Row>
    </Table>

    <Form :form="form">
      <Field label="Status" name="status" as="radio-group">
        <span as="radio-item" value="pendente" checked>Pendente</span>
        <span as="radio-item" value="concluido">Concluido</span>
      </Field>
    </Form>

    <Button type="submit" :disabled="form.loading"> Atualizar Lote </Button>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import 'bumi-components-new'

const hasError = useState(() => false)

const form = darpi.newForm({
  status: darpi.string().required()
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    navigateTo('/')
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.batch-edit {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
  .header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    img {
      cursor: pointer;
    }
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
  }
}
</style>
