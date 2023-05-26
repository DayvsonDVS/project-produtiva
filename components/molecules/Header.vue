<template>
  <div class="header">
    <h2>{{ title }}</h2>

    <img
      src="/svg/Close-Button.svg"
      @click="
        prop.route !== undefined ? navigateTo(`${prop.route}`) : router.go(-1)
      "
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  route?: string
}

const prop = defineProps<Props>()
const router = useRouter()
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  color: #ced1db;
  img {
    cursor: pointer;
  }
}
</style>
