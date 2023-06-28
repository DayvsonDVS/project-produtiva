<template>
  <div class="batch-table">
    <Table :columns="['ID', 'LOTE', 'STATUS', 'AÇÃO']" striped>
      <Row
        v-for="{ id, name, status } in batch.filteredBatch.sort((a, b) =>
          a.name.localeCompare(b.name)
        )"
        :uid="id"
      >
        <Column>{{ id }} </Column>
        <Column>{{ name }} </Column>
        <Column>
          <div class="status">
            {{ status == 'done' ? 'Concluído' : 'Pendente' }}
            <img v-if="status == 'pending'" src="/svg/X-red.svg" />
            <img v-if="status == 'done'" src="/svg/V-check.svg" />
          </div>
        </Column>
        <Column>
          <div class="action">
            <Button
              color="primary"
              v-if="profile === 'admin'"
              @click="navigateTo(`/batch/edit/${id}`)"
              >Editar</Button
            >
            <Button color="success" @click="navigateTo(`/batch/${id}`)"
              >Gerenciar</Button
            >

            <Button
              color="danger"
              v-if="profile === 'admin'"
              @click="destroy(id)"
              >Excluir</Button
            >
          </div>
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
const { profile } = useCookie('token').value as any

async function destroy(id: IBatch['id']) {
  const confirmation = confirm('Deseja realmente excluir?')

  if (confirmation) {
    await batch.destroy(id)
  }
}
</script>

<style scoped lang="scss">
.batch-table {
  max-height: 600px;
  width: 990px;
  overflow-y: auto;
  .status {
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
  }
  .table {
    width: 990px;
  }
  :deep(.table) thead tr {
    :nth-last-child(1) {
      justify-content: center;
      display: grid;
    }
  }
  :deep(.table) tbody tr {
    .action {
      display: grid;
      grid-auto-flow: column;
      gap: 0.5rem;
    }
  }
}
</style>
