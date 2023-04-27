<template>
  <div class="company-management-table">
    <Table
      :columns="['ID', 'EMPRESA', 'CNPJ', 'STATUS', 'COMPROVANTE', 'AÇÃO']"
      striped
    >
      <Row
        v-for="{
          batch_id,
          company_id,
          name,
          cnpj,
          status,
          receipt
        } in batchManagement.batchManagements"
        :uid="company_id"
      >
        <Column>{{ company_id }} </Column>
        <Column>{{ name }} </Column>
        <Column>{{ cnpj }} </Column>

        <div class="status">
          <Column v-if="status === 'pending'">
            Pendente
            <img src="@/svg/X-red.svg" />
          </Column>

          <Column v-if="status === 'done'">
            Concluído
            <img src="@/svg/V-check.svg" />
          </Column>
        </div>

        <Column>{{ receipt }} </Column>

        <Column>
          <Button
            color="primary"
            @click="
              navigateTo(`/batch/management/historic/${batch_id}/${company_id}`)
            "
            >Editar</Button
          >
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { useBatchManagement } from '@/stores/batchManagement'

const batchManagement = useBatchManagement()
// const route = useRoute()

// batchManagement.idBatchEdit = Number(route.params.id)
</script>

<style lang="scss">
.company-management-table {
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
