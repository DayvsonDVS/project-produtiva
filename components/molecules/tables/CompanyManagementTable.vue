<template>
  <div class="company-management-table">
    <Table
      :columns="['', 'EMPRESA', 'CNPJ', 'STATUS', 'COMPROVANTE', 'AÇÃO']"
      striped
    >
      <Row
        v-for="{
          batch_id,
          company_id,
          name,
          cnpj,
          status,
          receipt,
          validity_pcmso,
          user,
          edit_user
        } in batchManagement.filterCompany.sort((a, b) =>
          a.name.localeCompare(b.name)
        )"
        :uid="company_id"
      >
        <Column
          :class="{
            'awaiting-completion smoke': user !== null && status === 'pending'
          }"
        >
        </Column>

        <Column :class="[passedCurrentDate(validity_pcmso) ? 'vanquished' : '']"
          >{{ name }}
        </Column>

        <Column
          >{{ cnpj }}
          <img
            v-if="edit_user !== null"
            src="/svg/Pencil.svg"
            @click="viewEditor(edit_user)"
          />
        </Column>

        <div class="status">
          <Column v-if="status === 'pending'">
            <span>Pendente</span>
            <img src="/svg/X-red.svg" />
          </Column>

          <Column v-if="status === 'done'">
            <span>Concluído</span>
            <img src="/svg/V-check.svg" />
          </Column>
        </div>

        <Column>
          <div class="attachments">
            <Tag v-if="receipt" @click="openFile(receipt)">
              <img src="/svg/Image.svg" />
              <span>Arquivo</span>
            </Tag>
          </div>
        </Column>

        <Column>
          <Button
            @click="
              editBatchManagement(batch_id, company_id, edit_user, status)
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
import {
  Button,
  Table,
  Column,
  Row,
  useNotifications
} from 'bumi-components-new'
import { useBatchManagement } from '@/stores/batchManagement'
import { useBatch } from '@/stores/batch'

const batchManagement = useBatchManagement()
const batch = useBatch()

function openFile(url: string) {
  window.open(url, '_blank')
}

async function editBatchManagement(
  batch_id: number,
  company_id: number,
  edit_user: string | undefined,
  status: string
) {
  batchManagement.idCompany = company_id
  const { user } = useCookie('token').value as any

  if (
    edit_user !== null &&
    status !== 'done' &&
    edit_user !== user &&
    batch.batch.status !== 'done'
  ) {
    const confirmation = confirm(
      `Empresa em edição, ao continuar você irá substituir a edição do usuário, deseja realmente continuar?`
    )

    if (confirmation) {
      await batchManagement.updateEditCompany(user)
      navigateTo(`/batch/${batch_id}/historic/edit/${company_id}`)
    }
  } else if (
    edit_user === null &&
    status === 'pending' &&
    batch.batch.status !== 'done'
  ) {
    await batchManagement.updateEditCompany(user)
    navigateTo(`/batch/${batch_id}/historic/edit/${company_id}`)
  } else {
    navigateTo(`/batch/${batch_id}/historic/edit/${company_id}`)
  }
}

function viewEditor(user: string | undefined) {
  useNotifications({
    title: `${user?.toUpperCase()} está editando essa empresa.`,
    color: 'warning',
    position: 'center',
    speed: '1s',
    duration: 1500,
    ignoreDuplicates: false,
    closeOnClick: true
  })
}
</script>

<style lang="scss">
.company-management-table {
  max-height: 600px;
  width: 990px;
  overflow-y: auto;
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
        &.awaiting-completion::before {
          content: '';
          display: inline-block;
          position: relative;
          top: 12px;
          width: 18px;
          height: 20px;
          background-image: url('/svg/Rocket.svg');
          background-repeat: no-repeat;
        }
        &.smoke::after {
          content: '';
          display: inline-block;
          position: relative;
          top: 0px;
          left: 10px;
          transform: translate(-50%, -50%);
          width: 2px;
          height: 2px;
          background-color: #fff;
          border-radius: 50%;
          opacity: 0;
          animation: smokeAnimation 2s linear infinite;
        }
        @keyframes smokeAnimation {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(2);
            background-color: #eb9b9b;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
            background-color: #fd0505;
          }
        }
        &:nth-child(3) {
          white-space: nowrap;
          img {
            position: relative;
            width: 18px;
            top: 3px;
            cursor: pointer;
          }
        }
        .attachments {
          div {
            display: grid;
            grid-auto-flow: column;
            justify-content: center;
            gap: 0.5rem;
            background: rgba(28, 32, 41, 0.5);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
</style>
