<template>
  <div class="subsidiary-table">
    <Form class="search-form" :form="form">
      <Field name="searchable" placeholder="Pesquisar unidade">
        <template v-slot:prepend>
          <img src="/svg/magnifier.svg" />
        </template>
      </Field>
    </Form>
    <span>Total de unidades: {{ subsidiary.subsidiaries.length }} </span>
    <div class="table">
      <Table :columns="['UNIDADE', 'CNPJ', 'PCMSO', 'PROCURAÇÃO', 'AÇÃO']" striped>
        <Row v-for="{
      id,
      name,
      cnpj,
      validity_pcmso,
      procuration
    } in subsidiary.filteredSubsidiaries">
          <Column> {{ name }} </Column>

          <Column>{{ cnpj }} </Column>

          <Column>{{ validity_pcmso }} </Column>

          <Column>{{ procuration }} </Column>

          <Column class="table__column-action">
            <Button color="primary" @click="navigateTo(`/company/${idCompanySubsidiary}/edit/${id}`)"> Editar</Button>
            <Button color="danger" @click="destroy(id)"> Excluir</Button>
          </Column>
        </Row>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubsidiary } from '@/stores/subsidiary'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { Table, Column, Row } from 'bumi-components-new'

const subsidiary = useSubsidiary()
const route = useRoute()
const idCompanySubsidiary = Number(route.params.idCompanySubsidiary)

const form = darpi.newForm({
  searchable: darpi.string().required()
})

form.values.watch('searchable', (value) => {
  subsidiary.searchable = value
})

async function destroy(id: number) {
  const confirmation = confirm('Deseja realmente excluir?')

  if (confirmation) {
    await subsidiary.destroy(id)
  }
}
</script>

<style scoped lang="scss">
.subsidiary-table {
  padding-top: 50px;
  display: grid;
  gap: 1rem;
  border-radius: 12px;

  :deep(.search-form) {
    width: 400px;
    height: 39.64px;

    .field {
      width: 400px;

      .input-container {
        width: 400px;

        .prepend img {
          width: 22px;
        }
      }
    }
  }

  .table {
    overflow-y: auto;
    width: 900px;
    max-height: 320px;
    border-radius: 12px;

    :deep(tbody)tr {
      height: 2px;

      :nth-child(2) {
        white-space: nowrap;
      }
    }

    :deep(thead) {
      tr {
        th {
          &:last-child {
            display: grid;
            justify-content: center;
          }
        }
      }

    }

    .table__column-action {
      display: grid;
      grid-auto-flow: column;
      gap: 1rem;

    }
  }
}
</style>
