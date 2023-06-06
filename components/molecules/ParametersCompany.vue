<template>
  <div class="parameters-company">
    <Form class="company-form" :values="parameters" :form="form" @submit="send">
      <Field name="signed_contract" as="radio-group" label="Contrato Assinado">
        <span as="radio-item" :value="`yes`" checked>Sim</span>
        <span as="radio-item" :value="`no`">Não</span>
      </Field>

      <Field name="scheduling" as="radio-group" label="Agendamento SOC">
        <span as="radio-item" :value="`yes`" checked>Sim</span>
        <span as="radio-item" :value="`no`">Não</span>
      </Field>

      <Button type="submit" :disabled="form.loading"> Atualizar </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useCompany } from '@/stores/company'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'

const hasError = useState(() => false)
const companyParameters = useCompany()
const parameters = computed(() => {
  return companyParameters.parameters
})

const form = darpi.newForm({
  signed_contract: darpi.string().required(),
  scheduling: darpi.string().required()
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    await companyParameters.updateParameters(form.values.all)
    navigateTo('/company/')
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.parameters-company {
  width: 900px;
  height: auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  .company-form {
    display: grid;
    gap: 2rem;
    :deep(.label) {
      font-size: 18px;
      color: aqua;
      font-weight: 600;
    }
  }
}
</style>
