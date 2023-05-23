<template>
  <Form class="company-form" :form="form" @submit="send">
    <Field
      label="Razão Social"
      name="name"
      placeholder="Descreva a razão social"
    />

    <Field name="status" as="radio-group">
      <span as="radio-item" value="active" checked>Ativa</span>
      <span as="radio-item" value="inactive">Inativa</span>
    </Field>

    <div class="input-unique">
      <Field
        label="CNPJ"
        name="cnpj"
        placeholder="00.000.000/0000-00"
        mask="99.999.999/9999-99"
      />

      <Field
        label="CPF"
        name="cpf"
        placeholder="000.000.000-00"
        mask="999.999.999-99"
      />
    </div>

    <div class="field-date">
      <Field
        label="Data do Contrato"
        name="contract_date"
        placeholder="00/00/0000"
        mask="99/99/9999"
      />

      <Field
        label="Data do PCMSO"
        name="validity_pcmso"
        placeholder="00/00/0000"
        mask="99/99/9999"
      />
    </div>

    <Field
      label="Alerta"
      name="alert"
      placeholder="Descreva o alerta"
      as="textarea"
    />

    <Button type="submit" :disabled="form.loading"> Cadastrar </Button>
  </Form>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useCompany } from '@/stores/company'
import { useValidateDate } from '~/composables/useValidateDate'

const hasError = useState(() => false)
const companyStore = useCompany()

const form = darpi.newForm({
  name: darpi.string().required(),
  status: darpi.string().required(),
  cnpj: darpi.string().minLength(18, 'Mínimo de 18 caracteres'),
  cpf: darpi.string().cpf().minLength(14, 'Mínimo de 14 caracteres'),
  validity_pcmso: darpi.string().required().minLength(10, 'Data incorreta'),
  contract_date: darpi.string().required().minLength(10, 'Data incorreta'),
  alert: darpi.string()
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    if (form.values.all.cnpj === null && form.values.all.cpf === null) {
      alert('Deve ser informado o CNPJ ou CPF')
    } else {
      if (form.values.all.cnpj) {
        if (!useValidateCNPJ(form.values.all.cnpj!)) {
          alert('CNPJ inválido')
        }
      }
      if (useValidateDate(form.values.all.contract_date.toString())) {
        alert('Data do contrato inválida')
      }
      if (useValidateDate(form.values.all.validity_pcmso.toString())) {
        alert('Data do PCMSO inválida')
      }
      if (
        !useValidateDate(form.values.all.contract_date.toString()) &&
        !useValidateDate(form.values.all.validity_pcmso.toString())
      ) {
        await companyStore.create(form.values.all)
        navigateTo('/company/')
      }
    }
  } catch {
    hasError.value = true
    alert('Cadastro já existe')
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.company-form {
  display: grid;
  gap: 2rem;
  max-width: 600px;
  :deep(:nth-child(1)) {
    .input-container {
      width: 500px;
    }
  }
  .input-unique {
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
  .field-date {
    display: grid;
    grid-auto-flow: column;
    :deep(.input-container) {
      width: 120px;
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
