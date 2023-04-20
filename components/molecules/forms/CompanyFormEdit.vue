<template>
  <Form class="company-form-edit" :values="company" :form="form" @submit="send">
    <Field
      label="Razão Social"
      name="name"
      placeholder="Descreva a razão social"
    />

    <div class="input-column">
      <Field
        label="CNPJ"
        name="cnpj"
        placeholder="00.000.000/0000-00"
        mask="99.999.999/9999-99"
      />
      <Field
        label="Data do Contrato"
        name="contract_date"
        placeholder="00/00/0000"
        mask="99/99/9999"
      />
    </div>

    <Button type="submit" :disabled="form.loading"> Atualizar </Button>
  </Form>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useCompany } from '@/stores/company'

const hasError = useState(() => false)
const companyStore = useCompany()

const company = computed(() => {
  return companyStore.company
})

const form = darpi.newForm({
  name: darpi.string().required(),
  cnpj: darpi.string().required().minLength(18, 'Mínimo de 18 caracteres'),
  contract_date: darpi.string().required().minLength(10, 'Data incorreta')
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    if (!useValidateCNPJ(form.values.all.cnpj)) {
      alert('CNPJ inválido')
    } else if (useValidateDate(form.values.all.contract_date.toString())) {
      alert('Data incorreta')
    } else {
      await companyStore.update(form.values.all)

      navigateTo('/company/')
    }
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.company-form-edit {
  display: grid;
  gap: 2rem;
  :deep(:nth-child(1)) {
    .input-container {
      width: 500px;
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
    :deep(:nth-child(2)) {
      .input-container {
        width: max-content;
      }
    }
  }
  .field {
    :deep(span) {
      font-size: 18px;
    }
    :deep(.input-container) {
      background: #1c2029;
      border-radius: 12px;
      color: #838692;
    }
  }
}
</style>
