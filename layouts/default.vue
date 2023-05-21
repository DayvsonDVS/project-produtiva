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
    height: 150px;
    display: grid;
    justify-content: end;
    img {
      width: 40px;
      cursor: pointer;
    }
  }
  .main {
    min-height: calc(100vh - 5rem);
    min-width: 900px;
    display: grid;
    justify-items: center;
    align-content: center;
    padding-top: 22px;
    background: rgb(2, 106, 136);
    background: radial-gradient(
      circle,
      rgba(2, 106, 136, 1) 37%,
      rgba(25, 26, 28, 1) 100%
    );
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
}
</style>
