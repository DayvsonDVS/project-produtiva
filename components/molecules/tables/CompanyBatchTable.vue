<template>
  <div class="company-batch-table">
    <Table :columns="['ID', 'EMPRESA', 'CNPJ-CPF', 'AÇÃO']" striped>
      <Row v-for="{
        company_id,
        name,
        cpf,
        cnpj,
        validity_pcmso
      } in batchManagement.batchManagements.sort((a, b) =>
        a.name.localeCompare(b.name)
      )" :uid="company_id">
        <Column>{{ company_id }} </Column>
        <Column :class="[passedCurrentDate(validity_pcmso) ? 'vanquished' : '']">{{ name }}
        </Column>

        <Column v-if="cnpj === null">{{ cpf }} </Column>
        <Column v-if="cpf === null">{{ cnpj }} </Column>

        <Column>
          <Button color="danger" @click="removeCompany(company_id)">Remover</Button>
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { useBatchManagement } from '@/stores/batchManagement'

const batchManagement = useBatchManagement()

function removeCompany(id: number) {
  batchManagement.removeBatchCompanies.push(id)

  const newList = batchManagement.batchManagements.filter(
    (company) => company.company_id !== id
  )
  batchManagement.batchManagements = newList
}
</script>

<style scoped lang="scss">
.company-batch-table {
  max-height: 600px;
  overflow-y: auto;
  max-width: 990px;

  :deep(.table .tbody tr th) {
    &:nth-child(3) {
      white-space: nowrap;
    }
  }
}
</style>
