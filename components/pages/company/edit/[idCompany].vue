<template>
  <div class="company-edit">
    <Header title="Editar Empresa" route="/company" />

    <CompanyFormEdit />
  </div>
</template>

<script setup lang="ts">
import { useCompany } from '@/stores/company'

const route = useRoute()
const company = useCompany()
const id = Number(route.params.idCompany)

definePageMeta({
  middleware: ['guest', 'guest-admin']
})

onMounted(() => {
  company.show({ id })
})
</script>

<style scoped lang="scss">
.company-edit {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
}
</style>
