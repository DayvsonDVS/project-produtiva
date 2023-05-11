<template>
  <Form class="login-form" :form="form" @submit="send">
    <Field name="email" placeholder="E-mail" />
    <Field name="password" type="password" placeholder="Senha" />

    <span v-show="hasError" class="validator"> E-mail e senha inválidos' </span>

    <Button type="submit" :disabled="form.loading">
      <img src="@/svg/Right-Arrow.svg" /> Entrar
    </Button>
  </Form>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useAuth } from '@/stores/auth'

const hasError = useState(() => false)
const auth = useAuth()

const form = darpi.newForm({
  email: darpi.string().required().email(),
  password: darpi.string().required().minLength(6, 'Mínimo de 6 caracteres')
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    await auth.login(form.values.all)

    navigateTo('/')
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.login-form {
  min-width: 400px;
  display: grid;
  justify-self: center;
  :nth-last-child(1) {
    justify-self: center;
  }
  .field {
    background: #282c36;
    border-radius: 15px;
    color: #838692;
    padding: 8px;
    width: auto;
  }
  .validator {
    color: #913540;
    font-size: 12px;
    text-align: center;
  }
  .button {
    display: flex;
    grid-auto-flow: column;
    gap: 1.2rem;
  }
}
</style>
