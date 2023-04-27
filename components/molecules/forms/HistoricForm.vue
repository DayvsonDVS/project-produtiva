<template>
  <Form class="historic-form" :values="company" :form="form" @submit="send">
    <Field
      label="Nota Geral"
      name="historic"
      placeholder="Descreva o histórico"
      as="textarea"
    />

    <Field label="Status" name="status" as="radio-group">
      <span as="radio-item" :value="`pending`">Pendente</span>
      <span as="radio-item" :value="`done`">Concluido</span>
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
</template>

<script async setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useBatchManagement } from '@/stores/batchManagement'

const batchManagement = useBatchManagement()
const hasError = useState(() => false)
const router = useRouter()

const company = computed(() => {
  return batchManagement.batchManagement
})

console.log(batchManagement.batchManagement)

const form = darpi.newForm({
  historic: darpi.string().required(),
  status: darpi.string().required(),
  receipt: darpi.string()
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    await batchManagement.update(form.values.all)

    router.go(-1)
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
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
</style>
