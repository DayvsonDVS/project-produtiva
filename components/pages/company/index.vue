<template>
  <div class="company">
    <div class="header">
      <h2>Adicionar empresa</h2>
      <img src="@/svg/Close-Button.svg" alt="" />
    </div>

    <Form class="company-form" :form="form" @submit="send">
      <Field
        label="Razão Social"
        name="name"
        placeholder="Descreva a razão social"
      />

      <div class="input-column">
        <Field label="CNPJ" name="cnpj" placeholder="00.000.000/0000-00" />

        <Field
          label="Data do Contrato"
          name="contractDate"
          placeholder="00/00/0000"
        />
      </div>

      <Button type="submit" :disabled="form.loading"> Cadastrar </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import 'bumi-components-new/dist/style.css'
import { Button } from 'bumi-components-new'
import { Form, Field, darpi } from '@cataline.io/darpi'

const hasError = useState(() => false)

const form = darpi.newForm({
  name: darpi.string().required(),
  cnpj: darpi.string().required(),
  contractDate: darpi.string().required()
})

async function send() {
  try {
    form.loading = true
    hasError.value = false

    navigateTo('/')
  } catch {
    hasError.value = true
  } finally {
    form.loading = false
  }
}
</script>

<style scoped lang="scss">
.company {
  width: 900px;
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
  .header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    img {
      cursor: pointer;
    }
  }
  .company-form {
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
      :deep(.input-container) {
        background: #1c2029;
        border-radius: 12px;
        color: #838692;
      }
    }
  }
}
</style>
