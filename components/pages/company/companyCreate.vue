<template>
  <div class="company-create">
    <Header title="Adicionar Empresa" route="/company" />

    <CompanyForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest', 'guest-admin']
})
</script>

<style scoped lang="scss">
.company-create {
  display: grid;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
}
</style>
