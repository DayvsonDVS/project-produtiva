<template>
  <div class="historic-template">
    <Header title="Editar Histórico" />

    <div class="location-company">
      <span>{{ batchManagement.getCompany?.name }}</span>
      <br />
      <span v-if="batchManagement.getCompany?.cnpj">CNPJ: {{ batchManagement.getCompany?.cnpj }}</span>
      <span v-if="batchManagement.getCompany?.cpf">CPF: {{ batchManagement.getCompany?.cpf }}</span>
      <br />
      <span v-if="batchManagement.getCompany?.contract_date">Contrato: {{ batchManagement.getCompany?.contract_date
        }}</span>
      <br />
      <span v-if="batchManagement.getCompany?.email">E-mail: {{ batchManagement.getCompany?.email }}</span>
      <br />
      <span v-if="batchManagement.getCompany?.contact">Telefone: {{ batchManagement.getCompany?.contact }}</span>
    </div>

    <div v-show="passedCurrentDate(batchManagement.getCompany?.validity_pcmso!)" class="notification">
      <img src="/svg/Exclamation-triangle.svg" ref="exclamation" />
    </div>

    <div class="alert" v-if="company.company.alert !== '' && company.company.alert !== null">
      <h3>
        Alerta: <span class="alert-span">{{ company.company.alert }}</span>
      </h3>
    </div>

    <div class="historic-template__search">
      <img src="/svg/search.svg" @click="navigateTo(`/company/log/${company.company.id}`)" ref="search">
    </div>

    <HistoricForm />
  </div>
</template>

<script setup lang="ts">
import { useBatchManagement } from '@/stores/batchManagement'
import { useCompany } from '@/stores/company'
import tippy from 'tippy.js'
import { useNotifications } from 'bumi-components-new'

const batchManagement = useBatchManagement()
const company = useCompany()
const exclamation = ref<HTMLElement>()
const search = ref<HTMLElement>()
const route = useRoute()

onMounted(() => {
  setTimeout(() => {
    tippy(exclamation.value!, { content: 'Programa Vencido' })
    tippy(search.value!, { content: 'Hitórico de envio' })
    const procuration = expirationProcuration(Number(route.params.company).toString())

    if (procuration === 'Vencida') {
      useNotifications({
        title: `Procuração ${procuration}`,
        color: 'danger',
        position: 'center',
        duration: 2500,
        speed: '1s',
        ignoreDuplicates: false,
        closeOnClick: true
      })
    }
    if (parseInt(procuration) < 60) {
      useNotifications({
        title: `Vencimento da procuração em ${procuration} dias`,
        color: 'danger',
        duration: 2500,
        speed: '1s',
        position: 'center',
        ignoreDuplicates: false,
        closeOnClick: true
      })
    }

    function expirationProcuration(idCompany: string) {
      const companyProcuration = company.companySubsidiaries.find(({ id }) => {
        return id.toString() === idCompany
      })
      return passedCountCurrentDate(companyProcuration?.procuration!)
    }
  }, 55);



})
</script>

<style scoped lang="scss">
.historic-template {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;

  .alert {
    max-width: 600px;
    color: #ff9900;
    animation: colorChange 1s infinite;

    @keyframes colorChange {
      0% {
        color: rgb(0, 0, 255);
      }

      100% {
        color: orange;
      }
    }

    .alert-span {
      color: #0000cc;
    }
  }

  .location-company {
    display: grid;
    justify-self: center;
    color: #fff;
    background: #282c36;
    padding: 1rem;
    border-radius: 12px;
    border: solid #018ffb;
    justify-items: center;
  }

  .notification {
    display: grid;
    justify-content: end;

    img {
      width: 25px;
    }
  }

  .historic-template__search {
    padding-top: 1rem;
    display: grid;
    justify-content: center;

    img {
      color: #fff;
      cursor: pointer;
      width: 25px;
    }
  }


}
</style>
