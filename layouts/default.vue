<template>
  <div class="layout">
    <div class="home">
      <img src="/svg/House-up.svg" ref="home" @click="navigateTo('/')" />

      <img
        v-show="useCookie('token').value"
        src="/svg/Person-gear.svg"
        ref="users"
        @click="navigateTo('/user')"
      />

      <img src="/svg/Box-arrow-right.svg" ref="logout" @click="exit()" />
    </div>

    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import tippy from 'tippy.js'

const home = ref<HTMLElement>()
const users = ref<HTMLElement>()
const logout = ref<HTMLElement>()

onMounted(() => {
  tippy(logout.value!, { content: 'Sair' })
  tippy(home.value!, {
    content: 'Página inicial'
  })
  tippy(users.value!, { content: 'Usuários' })
})

function exit() {
  useCookie('token').value = null
  navigateTo('/login')
}
</script>

<style lang="scss">
.layout {
  min-height: 100vh;
  .home {
    position: relative;
    top: 0;
    width: 100%;
    padding: 10px;
    height: 150px;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
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
    align-content: baseline;
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
    .vanquished {
      color: #ffcc00;
    }
    .is-not-scheduled {
      background: red;
      border-radius: 4px;
    }
  }
}
</style>
