<template>
  <div class="company-batch-table">
    <Table :columns="['ID', 'Empresa', 'CNPJ', 'Ação']" striped>
      <Row
        v-for="{ id, name, cnpj } in batchManagement.batchCompanies"
        :uid="id"
      >
        <Column>{{ id }} </Column>
        <Column>{{ name }} </Column>
        <Column>{{ cnpj }} </Column>

        <Column>
          <Button color="danger">Remover</Button>
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { useBatchManagement } from '@/stores/batchManament'

const batchManagement = useBatchManagement()
</script>

<style lang="scss">
.company-batch-table {
  height: max-content;
  .table {
    min-width: 800px;
    thead tr {
      :nth-last-child(1) {
        display: grid;
        justify-content: center;
      }
    }
    tbody tr {
      :nth-last-child(1) {
        display: grid;
        grid-auto-flow: column;
        gap: 1rem;
      }
    }
  }
}
</style>
