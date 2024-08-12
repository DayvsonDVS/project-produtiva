<template>
  <div class="subsidiary-create">
    <Header title="Adicionar Unidade" />

    <SubsidiaryForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest', 'guest-admin']
})
</script>

<style scoped lang="scss">
.subsidiary-create {
  display: grid;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
}
</style>
