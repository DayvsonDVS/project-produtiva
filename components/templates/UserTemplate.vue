<template>
  <div class="user-template">
    <Header title="Pesquisar Usuário" route="/" />

    <Form class="search-form" :form="form">
      <Button color="primary" @click="navigateTo('/user/userCreate')">+</Button>

      <Field name="searchable" placeholder="Pesquisar usuário">
        <template v-slot:prepend>
          <img src="/svg/magnifier.svg" />
        </template>
      </Field>
    </Form>

    <UserTable />
  </div>
</template>

<script setup lang="ts">
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useUser } from '@/stores/user'

const user = useUser()

const form = darpi.newForm({
  searchable: darpi.string().required()
})

form.values.watch('searchable', (value) => {
  user.searchable = value
})
</script>

<style scoped lang="scss">
.user-template {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
  grid-auto-flow: row;
  .header {
    display: grid;
    align-items: center;
    .filter {
      img {
        cursor: pointer;
        width: 30px;
        &:hover {
          box-shadow: inset 5px 10px 18px white;
        }
      }
    }
  }
  form {
    display: grid;
    grid-template-columns: 1rem 1fr;
    gap: 2rem;
    justify-content: left;
  }
}
</style>
