<template>
  <div class="company-batch-table-add">
    <Table :columns="['ID', 'AÇÃO', 'EMPRESA', 'CNPJ']" striped>
      <Row
        v-for="{
          id,
          name,
          cnpj,
          contract_date,
          created_at,
          updated_at,
          status,
          validity_pcmso,
          alert,
          cpf
        } in companies.filterBatchCompanies.sort((a, b) =>
          a.name.localeCompare(b.name)
        )"
        :uid="id"
      >
        <Column>{{ id }} </Column>

        <Column>
          <Button
            color="primary"
            @click="
              addCompany({
                id: id,
                name: name,
                cnpj: cnpj,
                contract_date,
                created_at,
                updated_at,
                status,
                validity_pcmso,
                alert,
                cpf
              })
            "
            >+</Button
          >
        </Column>

        <Column :class="[hasPassedOneYear(validity_pcmso) ? 'vanquished' : '']"
          >{{ name }}
        </Column>
        <Column>{{ cnpj }} </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { useCompany } from '@/stores/company'
import { Company } from '@/models/Company'
import { useBatchManagement } from '@/stores/batchManagement'

const companies = useCompany()
const batchManagement = useBatchManagement()
const route = useRoute()
const id = Number(route.params.batchId)

function addCompany(company: Company) {
  batchManagement.addBatchCompanies.push(company)
  batchManagement.batchManagements.push({
    batch_id: id,
    company_id: company.id,
    cnpj: company.cnpj,
    name: company.name,
    created_at: '',
    historic: '',
    receipt: '',
    status: '',
    updated_at: '',
    user: '',
    id: undefined,
    cpf: company.cpf,
    validity_pcmso: company.validity_pcmso
  })
  removeCompany(companies.companies, company)
}

function removeCompany(companies: Company[], company: Company) {
  companies.map((item, index) => {
    if (item.id === company.id) {
      companies.splice(index, 1)
    }
  })
}
</script>

<style scoped lang="scss">
.company-batch-table-add {
  max-height: 600px;
  max-width: 900px;
  overflow-y: auto;
  :deep(.table .tbody tr th) {
    &:nth-child(2) {
      white-space: nowrap;
    }
  }
}
</style>
