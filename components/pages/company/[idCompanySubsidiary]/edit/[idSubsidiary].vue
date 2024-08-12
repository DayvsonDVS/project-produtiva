<template>
  <div class="subsidiary-edit">
    <Header title="Editar Unidade" />

    <SubsidiaryFormEdit />
  </div>
</template>

<script setup lang="ts">
import { useSubsidiary } from '@/stores/subsidiary'

const subsidiary = useSubsidiary()
const route = useRoute()
const id = Number(route.params.idSubsidiary)

onMounted(() => {
  subsidiary.showIdSubsidiary({ id })
})

definePageMeta({
  middleware: ['guest', 'guest-admin']
})

</script>

<style scoped lang="scss">
.subsidiary-edit {
  display: grid;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
}
</style>
