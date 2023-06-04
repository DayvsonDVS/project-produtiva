<template>
  <div class="log">
    <Header title="Históricos por empresa" />

    <HistoryFlow />
  </div>
</template>

<script setup lang="ts">
import { useHistoric } from '@/stores/historic'

const route = useRoute()
const historic = useHistoric()
const company_id = Number(route.params.idLog)

onMounted(() => {
  historic.show({ company_id })
})

definePageMeta({
  middleware: ['guest', 'guest-admin']
})
</script>

<style scoped lang="scss">
.log {
  display: grid;
  gap: 2rem;
}
</style>
