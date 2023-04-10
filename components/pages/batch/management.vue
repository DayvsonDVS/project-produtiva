<template>
  <div class="management">
    <div class="overview-card">
      <div class="card">
        <img src="@/svg/Graphic-green.svg" />
        <div>
          <span>1</span>
          Concluídas
        </div>
      </div>

      <div class="card">
        <img src="@/svg/Graphic-red.svg" />
        <div>
          <span>1</span>
          Pendentes
        </div>
      </div>
    </div>

    <Table
      :columns="['ID', 'Empresa', 'Status', 'Ação', 'Comprovante']"
      striped
    >
      <Row uid="1">
        <Column>1 </Column>
        <Column>Jc Congelados LTDA </Column>
        <Column>
          <div>Pendente <img src="@/svg/X-red.svg" /></div>
        </Column>
        <Column>
          <Button color="primary">Editar</Button>
        </Column>
        <Column> </Column>
      </Row>

      <Row uid="2">
        <Column>2 </Column>
        <Column>Ekimar Alimentos LTDA </Column>
        <Column>
          <div>Concluído <img src="@/svg/V-check.svg" /></div>
        </Column>
        <Column><Button color="primary">Editar</Button> </Column>
        <Column>
          <div>
            <button class="receipt">
              <img src="@/svg/Receipt.svg" />
              Comprovante
            </button>
          </div>
        </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Button, Table, Column, Row } from 'bumi-components-new'
</script>

<style scoped lang="scss">
.management {
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  .overview-card {
    display: grid;
    grid-auto-flow: column;
    color: #ced1db;
    gap: 1rem;
    .card {
      background: #282c36;
      border-radius: 12px;
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      justify-content: left;
      gap: 4rem;
      padding: 12px;
      img {
        cursor: pointer;
      }
      div {
        display: grid;
        justify-items: center;
      }
    }
  }
  .table .tbody .column .button {
    margin-right: 12px;
  }
  .table .tbody .column {
    align-items: center;
    .receipt {
      background: none;
      width: 100px;
      border-radius: 12px;
      border: dotted;
      padding: 8px;
      display: grid;
      justify-content: left;
      color: #ced1db;
      gap: 0.5rem;
      grid-auto-flow: column;
      font-size: 10px;
      cursor: pointer;
    }
  }
}
</style>
