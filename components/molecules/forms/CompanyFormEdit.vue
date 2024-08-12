<template>
  <Form class="company-form-edit" :values="company" :form="form" @submit="send">
    <div class="subsidiary" ref="viewSubsidiary">
      <Field label="Razão Social" name="name" placeholder="Descreva a razão social" />

    </div>

    <Field name="status" as="radio-group">
      <span as="radio-item" :value="`active`" checked>Ativa</span>
      <span as="radio-item" :value="`inactive`">Inativa</span>
    </Field>

    <div class="input-unique">
      <Field label="CNPJ" name="cnpj" placeholder="00.000.000/0000-00" mask="99.999.999/9999-99" />

      <Field label="CPF" name="cpf" placeholder="000.000.000-00" mask="999.999.999-99" />
    </div>

    <div class="field-date">
      <Field label="Data início do Contrato" name="contract_date" placeholder="00/00/0000" mask="99/99/9999" />

      <Field label="Vencimento do PCMSO" name="validity_pcmso" placeholder="00/00/0000" mask="99/99/9999" />

      <Field label="Vencimento da Procuração" name="procuration" placeholder="00/00/0000" mask="99/99/9999" />
    </div>

    <div class="field-contact">
      <Field label="E-mail" name="email" placeholder="Digite o e-mail" class="email" />

      <Field label="Telefone" name="contact" placeholder="(00) 00000-0000" mask="(99) 99999-9999" class="telefone" />
    </div>

    <Field name="receipt" label="
    Filtro de comprovante" as="radio-group">
      <span as="radio-item" :value="`n`">Não</span>
      <span as="radio-item" :value="`s`">Sim</span>
    </Field>

    <Field label="Alerta" name="alert" placeholder="Descreva o alerta" as="textarea" />
    <Button type="submit" :disabled="form.loading"> Atualizar </Button>
  </Form>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'
import { useCompany } from '@/stores/company'
import { useSubsidiary } from '@/stores/subsidiary'

const hasError = useState(() => false)
const companyStore = useCompany()
const subsidiary = useSubsidiary()
const activeSubsidiary = ref<boolean>(false)
const viewSubsidiary = ref<HTMLElement>()
const route = useRoute()
const company_id = Number(route.params.idCompany)

const company = computed(() => {
  return companyStore.company
})

const form = darpi.newForm({
  name: darpi.string().required(),
  status: darpi.string().required(),
  cnpj: darpi.string().minLength(18, 'Mínimo de 18 caracteres'),
  cpf: darpi.string().cpf().minLength(14, 'Mínimo de 14 caracteres'),
  validity_pcmso: darpi.string().required().minLength(10, 'Data incorreta'),
  contract_date: darpi.string().required().minLength(10, 'Data incorreta'),
  procuration: darpi.string().required().minLength(10, 'Data incorreta'),
  alert: darpi.string(),
  email: darpi.string().email().required(),
  contact: darpi.string().required(),
  receipt: darpi.string().required()
})

onMounted(() => {
  subsidiary.show({ company_id })
})

onOutsideClick(viewSubsidiary, () => {
  activeSubsidiary.value = false
  subsidiary.searchable = ''
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    const { cnpj, cpf, contract_date, validity_pcmso, procuration } = form.values.all

    if (!cnpj && !cpf) {
      alert('Deve ser informado o CNPJ ou CPF')
      return
    }

    const validations = [
      { condition: cnpj && !useValidateCNPJ(cnpj), message: 'CNPJ inválido' },
      { condition: useValidateDate(contract_date), message: 'Data do contrato inválida' },
      { condition: useValidateDate(validity_pcmso), message: 'Data do PCMSO inválida' },
      { condition: useValidateDate(procuration), message: 'Data da procuração inválida' },
    ]

    for (const validation of validations) {
      if (validation.condition) {
        alert(validation.message)
        return
      }
    }

    if (form.values.all.cnpj && form.values.all.cpf && useValidateCNPJ(form.values.all.cnpj)) {
      await companyStore.update(form.values.all)
      navigateTo('/company/')
      return
    }

    if (form.values.all.cnpj && useValidateCNPJ(form.values.all.cnpj)) {
      await companyStore.updateCompanyCPF(form.values.all)
      navigateTo('/company/')
      return
    }

    if (form.values.all.cpf && (form.values.all.cnpj === '' || useValidateCNPJ(form.values.all.cnpj!))) {
      await companyStore.updateCompanyCNPJ(form.values.all)
      navigateTo('/company/')
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
.company-form-edit {
  display: grid;
  gap: 2rem;
  max-width: 700px;

  :deep(:nth-child(1)) {
    .input-container {
      width: 650px;
    }
  }

  .subsidiary {
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
    align-items: center;

    img {
      width: 36px;
      cursor: pointer;
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

  .field-contact {
    display: grid;
    grid-auto-flow: row;
    gap: 1rem;

    :deep(.input-container) {
      width: 300px;
    }

    :deep(.field) {
      .email {
        max-width: 400px;
      }

      .telefone {
        width: 150px;
      }
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
