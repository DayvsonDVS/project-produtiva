<template>
  <div class="historic-template">
    <Header title="Editar Histórico" @click="router.go(-1)" />

    <div class="location-company">
      <span>{{ batchManagement.getCompany?.name }}</span>
    </div>

    <HistoricForm />
  </div>
</template>

<script setup lang="ts">
import { useBatchManagement } from '@/stores/batchManagement'

const router = useRouter()
const batchManagement = useBatchManagement()
</script>

<style scoped lang="scss">
.historic-template {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
  .location-company {
    display: grid;
    justify-self: center;
    color: #fff;
    background: #282c36;
    padding: 1rem;
    border-radius: 12px;
    border: solid #018ffb;
  }
}
</style>