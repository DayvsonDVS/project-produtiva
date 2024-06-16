<template>
  <div class="company-expiration-control">
    <Table filter :columns="['ID', 'EMPRESA', 'CNPJ', 'CONTRATO', 'PCMSO', 'PROCURAÇÃO']" striped>
      <Row v-for="{
      id,
      name,
      cnpj,
      contract_date,
      validity_pcmso,
      procuration
    } in company.filterExpirationControl.sort((a, b) =>
      a.name.localeCompare(b.name)
    )" :uid="id">
        <Column>{{ id }} </Column>
        <Column :class="[passedCurrentDate(validity_pcmso) ? 'vanquished' : '']">{{ name }}
        </Column>
        <Column>{{ cnpj }} </Column>
        <Column>{{ contract_date }} </Column>
        <Column>{{ validity_pcmso }} </Column>
        <Column>{{ procuration }} </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table, Column, Row } from 'bumi-components-new'
import { useCompany } from '@/stores/company'

const company = useCompany()
</script>

<style lang="scss">
.company-expiration-control {
  max-height: 600px;
  width: 990px;
  overflow-y: auto;

  .table {
    min-width: 800px;

    tbody tr {
      th {
        &:nth-child(3) {
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
