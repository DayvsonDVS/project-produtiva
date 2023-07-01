<template>
  <Form class="user-form" :form="form" @submit="send">
    <Field label="Nome" name="user" placeholder="Digite o nome" />

    <Field name="profile" as="radio-group">
      <span as="radio-item" value="default" checked>Default</span>
      <span as="radio-item" value="admin">Admin</span>
    </Field>

    <div class="field-contact">
      <Field
        label="E-mail"
        name="email"
        placeholder="Digite o e-mail"
        class="email"
      />

      <Field
        label="Senha"
        name="password"
        placeholder="Digite a senha"
        type="password"
      />
    </div>

    <Button type="submit" :disabled="form.loading"> Cadastrar </Button>
  </Form>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useUser } from '@/stores/user'

const hasError = useState(() => false)
const userStore = useUser()

const form = darpi.newForm({
  user: darpi.string().required(),
  email: darpi.string().email().required(),
  profile: darpi.string().required(),
  password: darpi.string().minLength(6, 'Mínimo de 6 caracteres').required()
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    await userStore.create(form.values.all)
    navigateTo('/user/')
  } catch {
    hasError.value = true
    alert('E-mail já existe')
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.user-form {
  display: grid;
  gap: 2rem;
  max-width: 700px;
  :deep(:nth-child(1)) {
    .input-container {
      width: 700px;
    }
  }
  .field-contact {
    display: grid;
    grid-auto-flow: row;
    gap: 1rem;
    :deep(.input-container) {
      width: 400px;
    }
  }
  .field {
    :deep(span) {
      font-size: 18px;
    }
    :deep(.input-container) {
      border-radius: 12px;
      color: #838692;
    }
  }
}
</style>
