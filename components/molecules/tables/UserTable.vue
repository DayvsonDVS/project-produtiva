<template>
  <div class="user-table">
    <Table filter :columns="['ID', 'NOME', 'EMAIL', 'PERFIL', 'AÇÃO']" striped>
      <Row
        v-for="{ id, user, email, profile } in userStore.filteredUsers.sort(
          (a, b) => a.user.localeCompare(b.user)
        )"
        :uid="id"
      >
        <Column>{{ id }} </Column>
        <Column>{{ user }} </Column>
        <Column>{{ email }} </Column>
        <Column>{{ profile }} </Column>

        <Column>
          <div class="action">
            <Button color="primary" @click="navigateTo(`/user/edit/${id}`)"
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
import { useUser } from '@/stores/user'
import { User as IUser } from '@/models/User'

const userStore = useUser()

async function destroy(id: IUser['id']) {
  const confirmation = confirm('Deseja realmente excluir?')

  if (confirmation) {
    await userStore.destroy(id)
  }
}
</script>

<style lang="scss">
.user-table {
  max-height: 600px;
  width: 990px;
  overflow-y: auto;
  .table {
    min-width: 800px;
    thead tr {
      :nth-last-child(1) {
        padding-left: 112px;
      }
    }
    tbody tr {
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
