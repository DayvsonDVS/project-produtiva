<template>
  <div class="company-table">
    <Table
      filter
      :columns="[
        'ID',
        'LOG',
        'CHECK',
        'STATUS',
        'EMPRESA',
        'CNPJ',
        'CONTRATO',
        'AÇÃO'
      ]"
      striped
    >
      <Row
        v-for="{
          id,
          name,
          cnpj,
          contract_date,
          validity_pcmso,
          scheduling,
          status
        } in company.filteredCompanies.sort((a, b) =>
          a.name.localeCompare(b.name)
        )"
        :uid="id"
      >
        <Column>{{ id }} </Column>

        <Column class="log"
          ><img
            src="/svg/Journal-text.svg"
            @click="navigateTo(`/company/log/${id}`)"
          />
        </Column>

        <Column class="toggles">
          <img
            src="/svg/Toggles.svg"
            @click="navigateTo(`/company/check/${id}`)"
            :class="[scheduling !== 'yes' ? 'is-not-scheduled' : '']"
          />
        </Column>

        <Column>
          {{ status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() }}
        </Column>

        <Column :class="[passedCurrentDate(validity_pcmso) ? 'vanquished' : '']"
          >{{ name }}
        </Column>

        <Column>{{ cnpj }} </Column>
        <Column>{{ contract_date }} </Column>

        <Column>
          <div class="action">
            <Button color="primary" @click="navigateTo(`/company/edit/${id}`)"
              >Editar</Button
            >
            <Button color="danger" @click="destroy(id)">Excluir</Button>
          </div>
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
    try {
      await company.destroy(id)
    } catch (error) {
      alert(
        'Existe unidade cadastrada para essa empresa, é necessário removê-las para excluir a empresa.'
      )
    }
  }
}
</script>

<style lang="scss">
.company-table {
  max-height: 600px;
  width: 990px;
  overflow-y: auto;
  .table {
    min-width: 800px;
    thead tr {
      :nth-last-child(1) {
        padding-left: 58px;
      }
    }
    tbody tr {
      border-radius: 50px;
      .log {
        text-align: -webkit-center;
        img {
          cursor: pointer;
          width: 22px;
        }
      }
      .toggles {
        text-align: -webkit-center;
        img {
          cursor: pointer;
          width: 22px;
        }
      }
      .action {
        display: grid;
        grid-auto-flow: column;
        gap: 1rem;
      }
      :nth-child(6) {
        white-space: nowrap;
      }
    }
  }
}
</style>
