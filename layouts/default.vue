<template>
  <div class="layout">
    <div class="logout">
      <img src="@/svg/Box-arrow-right.svg" ref="logout" @click="exit()" />
    </div>

    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import tippy from 'tippy.js'

const logout = ref<HTMLElement>()

onMounted(() => {
  tippy(logout.value!, { content: 'Sair' })
})

function exit() {
  useCookie('token').value = null
  navigateTo('/login')
}
</script>

<style lang="scss">
.layout {
  min-height: 100vh;
  .logout {
    position: relative;
    top: 0;
    width: 100%;
    padding: 10px;
    height: 250px;
    display: grid;
    justify-content: end;
    img {
      width: 40px;
      cursor: pointer;
    }
  }
  .main {
    min-height: calc(100vh - 5rem);
  }
}
</style>
