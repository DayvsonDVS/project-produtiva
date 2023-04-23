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
          <Button color="danger" @click="destroy(id)">Excluir</Button>
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { useCompany } from '@/stores/company'
import { Company as ICopany } from '@/models/Company'

const company = useCompany()

async function destroy(id: ICopany['id']) {
  const confirmation = confirm('Deseja realmente excluir?')

  if (confirmation) {
    await company.destroy(id)
  }
}
</script>

<style lang="scss">
.company-table {
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
