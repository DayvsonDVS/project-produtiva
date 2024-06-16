<template>
  <Form class="batch-form-edit" :values="batchStore.batch" :form="form" @submit="send">
    <div class="lamp-input">
      <Field label="Lote" name="name" placeholder="Descreva o nome do lote" />

      <img src="/svg/lightbulb.svg" ref="lamp" @click="autoFilling()" />
    </div>

    <Field name="status" as="radio-group">
      <span as="radio-item" :value="`pending`" checked>Pendente</span>
      <span as="radio-item" :value="`done`">Concluído</span>
    </Field>

    <h3>Empresas do lote</h3>
    <CompanyBatchTable />

    <h3>Adicionar empresas</h3>
    <CompanyBatchTableAdd />

    <Button type="submit" :disabled="form.loading"> Atualizar </Button>
  </Form>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useBatch } from '@/stores/batch'
import { useBatchManagement } from '@/stores/batchManagement'
import { CreatePayload } from '@/models/BatchManagement'
import tippy from 'tippy.js'

const hasError = useState(() => false)
const batchStore = useBatch()
const batchManagement = useBatchManagement()
const lamp = ref<HTMLElement>()
const route = useRoute()
const id = Number(route.params.id)
const listBatchManagement = [] as CreatePayload[]

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

    if (batchManagement.addBatchCompanies.length !== 0) {
      batchManagement.addBatchCompanies.map((company) => {
        listBatchManagement.push({
          id: undefined,
          batch_id: id,
          company_id: company.id,
          historic: '',
          status: 'pending'
        })
      })
      await batchManagement.create(listBatchManagement)
    }

    await batchStore.update(form.values.all)
    await batchManagement.destroyCompanies(
      id,
      batchManagement.removeBatchCompanies
    )

    batchManagement.removeBatchCompanies = []
    batchManagement.addBatchCompanies = []

    navigateTo('/')
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.batch-form-edit {
  display: grid;
  gap: 2rem;

  h3 {
    display: grid;
    justify-content: center;
    color: #fff;
  }

  :deep(:nth-child(1)) {
    .input-container {
      width: 500px;
    }
  }

  .lamp-input {
    width: max-content;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 1rem;

    :deep(.field) {
      .input-container {
        width: max-content;
      }
    }

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

  .field {
    :deep(span) {
      font-size: 18px;
    }
  }
}
</style>
