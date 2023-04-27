<template>
  <div class="historic-template">
    <Header title="Editar Histórico" @click="router.go(-2)" />

    <HistoricForm />
  </div>
</template>

<script async setup lang="ts">
import 'bumi-components-new/dist/style.css'

const router = useRouter()
</script>

<style scoped lang="scss">
.historic-template {
  width: 900px;
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
}
</style>
