<template>
  <div class="historic">
    <Header title="Editar Histórico" @click="router.back" />

    <Form class="historic-form" :form="form" @submit="send">
      <Field
        label="Nota Geral"
        name="historic"
        placeholder="Descreva o histórico"
        as="textarea"
      />

      <Field label="Status" name="status" as="radio-group">
        <span as="radio-item" value="pending" checked>Pendente</span>
        <span as="radio-item" value="done">Concluido</span>
      </Field>

      <Field
        label="Comprovante de envio"
        name="receipt"
        placeholder="Procurar arquivo"
        as="file"
      >
        <img src="@/svg/Clip.svg" />
      </Field>

      <Button type="submit" :disabled="form.loading">
        Atualizar Histórico
      </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'

const router = useRouter()
const hasError = useState(() => false)

const form = darpi.newForm({
  historic: darpi.string().required(),
  status: darpi.string().required(),
  receipt: darpi.string().required()
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    navigateTo('/')
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.historic {
  width: 900px;
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
  .historic-form {
    display: grid;
    gap: 2rem;
    .field {
      :deep(span) {
        font-size: 18px;
      }
      :deep(svg) {
        fill: #ced1db;
      }
      :deep(.input-container) {
        background: #1c2029;
        border-radius: 12px;
        color: #838692;
      }
      :deep(.textarea-container) {
        background: #1c2029;
        border-radius: 12px;
        color: #838692;
        width: 500px;
      }
      :deep(.checkmark) {
        cursor: pointer;
        color: #838692;
      }
      :deep(.file-container) {
        background: #1c2029;
        border-radius: 12px;
        color: #838692;
      }
    }
  }
}
</style>
