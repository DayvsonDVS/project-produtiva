<template>
  <div class="company-table">
    <Table
      :columns="['ID', 'Empresa', 'CNPJ', 'Data do contrato', 'Ação']"
      striped
    >
      <Row
        v-for="{ id, name, cnpj, contract_date } in company.filteredCompanies"
        :uid="id"
      >
        <Column>{{ id }} </Column>
        <Column>{{ name }} </Column>
        <Column>{{ cnpj }} </Column>
        <Column>{{ contract_date }} </Column>

        <Column>
          <Button color="primary" @click="navigateTo(`/company/edit/${id}`)"
            >Editar</Button
          >
          <Button color="danger" @click="navigateTo(`/company/edit/${id}`)"
            >Excluir</Button
          >
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { useCompany } from '@/stores/company'

const company = useCompany()
</script>

<style lang="scss">
.company-table {
  .table {
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
