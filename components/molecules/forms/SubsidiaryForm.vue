<template>
  <div class="subsidiary-form">
    <Form :form="form">
      <Field
        label="Razão Social"
        name="name"
        placeholder="Descreva a razão social"
      />

      <div class="subitem">
        <Field
          label="CNPJ"
          name="cnpj"
          placeholder="00.000.000/0000-00"
          mask="99.999.999/9999-99"
        />

        <Field
          label="Data do PCMSO"
          name="validity_pcmso"
          placeholder="00/00/0000"
          mask="99/99/9999"
        />

        <Button
          type="submit"
          color="primary"
          @click="send()"
          :disabled="form.loading"
          >+</Button
        >
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, darpi } from '@cataline.io/darpi'
import { Button } from 'bumi-components-new'
import { useSubsidiary } from '@/stores/subsidiary'
import { useCompany } from '@/stores/company'

const subsidiary = useSubsidiary()
const company = useCompany()
const route = useRoute()
const id = Number(route.params.idCompany)

const form = darpi.newForm({
  name: darpi.string().required(),
  cnpj: darpi.string().required(),
  validity_pcmso: darpi.string().required()
})

async function send() {
  try {
    form.loading = true

    if (
      form.values.all.name &&
      form.values.all.cnpj &&
      form.values.all.validity_pcmso
    ) {
      if (!useValidateCNPJ(form.values.all.cnpj!)) {
        alert('CNPJ inválido')
      } else if (useValidateDate(form.values.all.validity_pcmso.toString())) {
        alert('Data do PCMSO inválida')
      } else if (!useValidateDate(form.values.all.validity_pcmso.toString())) {
        await subsidiary.create({
          company_id: id,
          name: form.values.all.name,
          cnpj: form.values.all.cnpj,
          unique_cnpj_company: id + form.values.all.cnpj,
          validity_pcmso: form.values.all.validity_pcmso,
          contract_date: company.company.contract_date
        })
        subsidiary.show({ company_id: id })
      }
    }
  } catch {
    alert(`${form.values.all.cnpj} esse cnpj já está cadatrado`)
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.subsidiary-form {
  padding-top: 20px;
  width: 600px;
  &:deep(.darpi) {
    max-width: 600px;
    :nth-child(1) {
      width: 600px;
      :nth-child(2) {
        width: 600px;
      }
    }
    .subitem {
      display: grid;
      grid-template-columns: 200px 200px 165px;
      gap: 1rem;
      width: 500px;
      align-items: center;
      justify-items: center;
      :nth-child(1) {
        width: 200px;
      }
      :nth-child(2) {
        width: 200px;
      }
      :nth-child(3) {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
