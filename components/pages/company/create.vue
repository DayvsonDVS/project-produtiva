<template>
  <div class="company-create">
    <Header title="Adicionar Empresa" route="/company" />

    <CompanyForm />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.company-create {
  width: 900px;
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
}
</style>
