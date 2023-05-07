<template>
  <div class="tag">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tag {
  border: 1px dashed #838692;
  border-radius: 1rem;
  color: #838692;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 13px;
}
</style>
