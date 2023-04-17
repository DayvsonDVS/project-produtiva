<template>
  <div class="company-create">
    <div class="header">
      <h2>Adicionar empresa</h2>

      <img src="@/svg/Close-Button.svg" @click="navigateTo('/company')" />
    </div>

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
