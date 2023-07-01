<template>
  <UserTemplate />
</template>

<script setup lang="ts">
import { useUser } from '@/stores/user'

const user = useUser()

onMounted(() => {
  user.fetchUsers()
})

onUnmounted(() => {
  user.searchable = ''
})

definePageMeta({
  middleware: ['guest', 'guest-admin']
})
</script>
