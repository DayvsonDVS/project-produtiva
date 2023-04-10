<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 900px;
  height: 100%;
  @include for-size('phone') {
    width: 90%;
  }
  @include for-size('tablet') {
    width: 85%;
  }
  @include for-size('desktop', 'big-desktop') {
    width: 85%;
  }
}
</style>
