<template>
  <Form class="user-form-edit" :values="user" :form="form" @submit="send">
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

      <img
        class="arrow-repeat"
        ref="changePass"
        src="/svg/Arrow-bar-down.svg"
        @click="onChangePass()"
      />

      <Field
        v-show="fieldPass"
        label="Senha"
        name="password"
        placeholder="Digite a senha"
        type="password"
      />
    </div>

    <Button type="submit" :disabled="form.loading"> Atualizar </Button>
  </Form>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useUser } from '@/stores/user'
import tippy from 'tippy.js'

const hasError = useState(() => false)
const userStore = useUser()
const fieldPass = ref<boolean>(false)
const changePass = ref<HTMLElement>()

const user = computed(() => {
  return userStore.user
})

const form = darpi.newForm({
  user: darpi.string().required(),
  email: darpi.string().email().required(),
  profile: darpi.string().required(),
  password: darpi.string().minLength(6, 'Mínimo de 6 caracteres')
})

onMounted(() => {
  tippy(changePass.value!, { content: 'Atualizar Senha' })
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    await userStore.update(form.values.all)
    navigateTo('/user')
  } catch {
    hasError.value = true
    alert('E-mail já existe')
  } finally {
    form.loading = false
  }
}
function onChangePass() {
  fieldPass.value = !fieldPass.value
}
</script>

<style scoped lang="scss">
.user-form-edit {
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
    .arrow-repeat {
      padding-top: 12px;
      padding-left: 12px;
      width: 42px;
      cursor: pointer;
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
