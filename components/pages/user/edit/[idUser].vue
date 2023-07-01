<template>
  <div class="user-edit">
    <Header title="Editar Usuário" route="/user" />

    <UserFormEdit />
  </div>
</template>

<script setup lang="ts">
import { useUser } from '@/stores/user'

const route = useRoute()
const user = useUser()
const id = Number(route.params.idUser)

definePageMeta({
  middleware: ['guest', 'guest-admin']
})

onMounted(() => {
  user.show({ id })
})
</script>

<style scoped lang="scss">
.user-edit {
  display: grid;
  align-items: center;
  justify-content: center;
  color: #ced1db;
  gap: 2rem;
}
</style>
