<template>
  <div class="user-create">
    <Header title="Adicionar Usuário" route="/user" />

    <UserForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest', 'guest-admin']
})
</script>

<style scoped lang="scss">
.user-create {
  display: grid;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
}
</style>
