<template>
  <div class="batch-table">
    <Table :columns="['ID', 'Lote', 'Status', 'Ação']" striped>
      <Row v-for="{ id, name, status } in batch.lots" :uid="id">
        <Column>{{ id }} </Column>
        <Column>{{ name }} </Column>
        <Column>
          <div class="status">
            {{ status == 1 ? 'Concluído' : 'Pendente' }}
            <img v-if="status == 0" src="@/svg/X-red.svg" />
            <img v-if="status == 1" src="@/svg/V-check.svg" />
          </div>
        </Column>
        <Column>
          <Button color="primary">Editar</Button>
          <Button color="success">Gerenciar</Button>
          <Button color="danger" @click="destroy(id)">Excluir</Button>
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { useBatch } from '@/stores/batch'
import { Batch as IBatch } from '@/models/Batch'

const batch = useBatch()

async function destroy(id: IBatch['id']) {
  const confirmation = confirm('Deseja realmente excluir?')

  if (confirmation) {
    await batch.destroy(id)
  }
}
</script>

<style scoped lang="scss">
.batch-table {
  .table .tbody .column .button {
    margin-right: 12px;
  }
  .status {
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
    justify-content: space-between;
  }
  .table thead tr {
    :nth-last-child(1) {
      justify-content: center;
      display: grid;
    }
  }
}
</style>
