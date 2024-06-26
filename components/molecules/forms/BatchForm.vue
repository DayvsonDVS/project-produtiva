<template>
  <Form class="batch-form" :form="form" @submit="send">
    <div class="lamp-input">
      <Field label="Lote" name="name" placeholder="Descreva o nome do lote" />

      <img src="/svg/lightbulb.svg" ref="lamp" @click="autoFilling()" />
    </div>

    <Field name="status" as="radio-group">
      <span as="radio-item" value="pending" checked>Pendente</span>
      <span as="radio-item" value="done">Concluído</span>
    </Field>

    <Button type="submit" :disabled="form.loading"> Cadastrar </Button>
  </Form>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useBatch } from '@/stores/batch'
import tippy from 'tippy.js'

const hasError = useState(() => false)
const batchStore = useBatch()
const lamp = ref<HTMLElement>()

const form = darpi.newForm({
  name: darpi.string().required(),
  status: darpi.string().required()
})

onMounted(() => {
  tippy(lamp.value!, { content: 'Sugestão' })
})

function autoFilling() {
  const date = new Date()
  const month = new Intl.DateTimeFormat('pt', { month: 'long' })
    .format(date)
    .toUpperCase()

  form.values.set('name', `${month} - ${date.getFullYear()}`)
}

async function send() {
  try {
    form.loading = true
    hasError.value = false

    await batchStore.create(form.values.all)

    navigateTo('/')
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.batch-form {
  display: grid;
  gap: 2rem;
  min-width: 600px;

  :deep(:nth-child(1)) {
    .input-container {
      width: 500px;
    }
  }

  .lamp-input {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 1rem;

    img {
      position: relative;
      bottom: -14px;
      cursor: pointer;
      width: 25px;

      &:hover {
        box-shadow: inset 5px 10px 18px white;
        border-radius: 50%;
      }
    }
  }

  .input-column {
    display: grid;
    grid-auto-flow: column;

    :deep(:nth-child(1)) {
      .input-container {
        width: max-content;
      }
    }
  }

  .field {
    :deep(span) {
      font-size: 18px;
    }
  }
}
</style>
