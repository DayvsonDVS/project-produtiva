<template>
  <div class="company-edit">
    <div class="header">
      <h2>Editar empresa</h2>

      <img src="@/svg/Close-Button.svg" @click="navigateTo('/company')" />
    </div>

    <CompanyFormEdit />
  </div>
</template>

<script setup lang="ts">
import { useCompany } from '@/stores/company'

const route = useRoute()
const company = useCompany()
const id = Number(route.params.id)

onMounted(() => {
  company.show({ id })
})
</script>

<style scoped lang="scss">
.company-edit {
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
}
</style>
