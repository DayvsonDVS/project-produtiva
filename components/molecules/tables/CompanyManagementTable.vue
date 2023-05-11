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
        } in batchManagement.filterCompany"
        :uid="company_id"
      >
        <Column>{{ company_id }} </Column>
        <Column>{{ name }} </Column>
        <Column>{{ cnpj }} </Column>

        <div class="status">
          <Column v-if="status === 'pending'">
            <span>Pendente</span>
            <img src="@/svg/X-red.svg" />
          </Column>

          <Column v-if="status === 'done'">
            <span>Concluído</span>
            <img src="@/svg/V-check.svg" />
          </Column>
        </div>

        <Column>
          <div class="attachments">
            <Tag v-if="receipt" @click="openFile(receipt)">
              <img src="@/svg/Image.svg" />
              <span>Arquivo</span>
            </Tag>
          </div>
        </Column>

        <Column>
          <Button
            @click="
              navigateTo(`/batch/${batch_id}/historic/edit/${company_id}`)
            "
          >
            Editar
          </Button>
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
import { useBatchManagement } from '@/stores/batchManagement'

const batchManagement = useBatchManagement()

function openFile(url: string) {
  window.open(url, '_blank')
}
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
      .status {
        th {
          display: grid;
          grid-auto-flow: column;
          gap: 0.5rem;
          justify-content: space-between;
          align-items: center;
          span {
            padding: 10px 10px 10px 0px;
          }
        }
      }
      th {
        .attachments {
          div {
            display: grid;
            grid-auto-flow: column;
            justify-content: center;
            gap: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
