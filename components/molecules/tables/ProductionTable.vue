<template>
  <div class="production-table">
    <Table :columns="['USUÁRIO', 'TOTAL']" striped>
      <Row v-for="{ user, total } in batchManagement.filterProduction">
        <Column :class="{ alert: user === 'Vazio' ? true : false }">
          {{ user }}
        </Column>
        <Column :class="{ alert: user === 'Vazio' ? true : false }"
          >{{ total }}
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { useBatchManagement } from '@/stores/batchManagement'
import { Table, Column, Row } from 'bumi-components-new'

const batchManagement = useBatchManagement()

batchManagement.filterProduction
</script>

<style scoped lang="scss">
.production-table {
  max-height: 300px;
  width: 390px;
  overflow-y: auto;
  .table {
    min-width: 300px;
    thead tr {
      :nth-last-child(1) {
        padding-left: 112px;
      }
    }
    tbody tr {
      :deep(th) {
        &.column {
          &.alert {
            color: #ff9900;
          }
        }
      }
      .action {
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        gap: 1rem;
      }
    }
  }
}
</style>
