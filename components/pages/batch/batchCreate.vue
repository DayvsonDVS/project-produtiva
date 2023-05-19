<template>
  <div class="batch-create">
    <Header title="Adicionar Lote" route="/" />

    <BatchForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest', 'guest-admin']
})
</script>

<style scoped lang="scss">
.batch-create {
  display: grid;
  justify-content: center;
  gap: 1rem;
}
</style>
