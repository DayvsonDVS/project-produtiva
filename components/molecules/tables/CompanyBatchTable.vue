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
