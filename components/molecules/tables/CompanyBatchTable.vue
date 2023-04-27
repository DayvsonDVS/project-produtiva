<template>
  <div class="company-batch-table">
    <Table :columns="['ID', 'EMPRESA', 'CNPJ', 'AÇÃO']" striped>
      <Row
        v-for="{ company_id, name, cnpj } in batchManagement.batchManagements"
        :uid="company_id"
      >
        <Column>{{ company_id }} </Column>
        <Column>{{ name }} </Column>
        <Column>{{ cnpj }} </Column>

        <Column>
          <Button color="danger" @click="removeCompany(company_id)"
            >Remover</Button
          >
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { useBatchManagement } from '~/stores/batchManagement'

const batchManagement = useBatchManagement()

function removeCompany(id: number) {
  batchManagement.removeBatchCompanies.push(id)

  const newList = batchManagement.batchManagements.filter(
    (company) => company.company_id !== id
  )
  batchManagement.batchManagements = newList
}
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
        justify-content: center;
      }
    }
  }
}
</style>
