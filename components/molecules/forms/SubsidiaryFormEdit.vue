<template>
  <div class="subsidiary-form-edit">
    <Form :values="subsidiary" :form="form">
      <Field label="Razão Social" name="name" placeholder="Descreva a razão social" />

      <div class="subitem">
        <Field class="subitem-cnpj" label="CNPJ" name="cnpj" placeholder="00.000.000/0000-00"
          mask="99.999.999/9999-99" />

        <Field class="subitem-pcmso" label="Data fim PCMSO" name="validity_pcmso" placeholder="00/00/0000"
          mask="99/99/9999" />

        <Field class="subitem-procuration" label="Data fim Procuração" name="procuration" placeholder="00/00/0000"
          mask="99/99/9999" />
      </div>

      <Button type="submit" color="primary" @click="send()" :disabled="form.loading">Atualizar</Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, darpi } from '@cataline.io/darpi'
import { Button } from 'bumi-components-new'
import { useSubsidiary } from '@/stores/subsidiary'
import { useCompany } from '@/stores/company'

const subsidiaryStore = useSubsidiary()
const company = useCompany()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.idCompanySubsidiary)
const idSubsidiary = Number(route.params.idSubsidiary)

const subsidiary = computed(() => {
  return subsidiaryStore.subsidiary
})

const form = darpi.newForm({
  name: darpi.string().required(),
  cnpj: darpi.string().required(),
  validity_pcmso: darpi.string().required(),
  procuration: darpi.string().required()

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
      }
      else if (useValidateDate(form.values.all.procuration.toString())) {
        alert('Data da procuração inválida')
      }
      else if (!useValidateDate(form.values.all.validity_pcmso.toString())) {

        await subsidiaryStore.update({
          id: idSubsidiary,
          company_id: id,
          name: form.values.all.name,
          unique_cnpj_company: id + form.values.all.cnpj,
          cnpj: form.values.all.cnpj,
          validity_pcmso: form.values.all.validity_pcmso,
          contract_date: company.company.contract_date,
          procuration: form.values.all.procuration
        })
        subsidiaryStore.show({ company_id: id })

        router.go(-1)
      }
    }
  } catch {
    alert(`${form.values.all.cnpj} esse cnpj já está cadastrado`)
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.subsidiary-form-edit {
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
      grid-template-columns: 190px 120px 120px 120px;
      gap: 1.8rem;
      width: 500px;
      align-items: center;
      justify-items: center;

      .subitem-cnpj {
        width: 180px;

        input {
          max-width: 180px;
        }
      }

      .subitem-pcmso {
        width: 120px;

        input {
          max-width: 120px;
        }
      }

      .subitem-procuration {
        width: 120px;

        input {
          max-width: 120px;
        }
      }

    }
  }
}
</style>
