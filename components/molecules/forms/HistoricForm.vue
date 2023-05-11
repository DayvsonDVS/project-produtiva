<template>
  <Form
    class="historic-form"
    :values="batchManagement.getCompany"
    :form="form"
    @submit="send"
  >
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

    <img ref="eye" class="see" :src="srcEye" @click="openLog()" />

    <div class="log">
      <div class="log-input" v-show="showLog">
        <Field label="Usuário" name="user" disabled />

        <Field label="Última Alteração" name="updated_at" disabled />
      </div>
    </div>

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

<script setup lang="ts">
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useBatchManagement } from '@/stores/batchManagement'
import tippy from 'tippy.js'

const batchManagement = useBatchManagement()
const hasError = useState(() => false)
const router = useRouter()
const showLog = ref<boolean>(false)
const eye = ref<HTMLElement>()
const srcEye = ref('/svg/Eye.svg')

const form = darpi.newForm({
  historic: darpi.string().required(),
  status: darpi.string().required(),
  user: darpi.string(),
  updated_at: darpi.string('DD/MM/YYYY'),
  receipt: darpi.file('15mb')
})

onMounted(() => {
  tippy(eye.value!, { content: 'Log de ações' })
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    await batchManagement.update(form.values.all)

    if (form.values.all.status) {
      await batchManagement.attachReceipt(form.values.all)
    }

    router.go(-1)
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
function openLog() {
  showLog.value = !showLog.value
  if (showLog.value) {
    srcEye.value = '/svg/Eye-slash.svg'
  } else {
    srcEye.value = '/svg/Eye.svg'
  }
}
</script>

<style scoped lang="scss">
.historic-form {
  display: grid;
  .see {
    width: 20px;
    cursor: pointer;
    color: #fff;
    justify-self: end;
  }
  .log {
    display: grid;
    justify-content: center;
    width: auto;
    .log-input {
      display: grid;
      grid-auto-flow: column;
      gap: 1rem;
      width: 460px;
    }
  }
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
