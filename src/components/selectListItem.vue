<template>
  <div class="select-wrapper" :style="styles">
    <span class="option">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.select-wrapper {
  padding: 10px 0;
  background-color: transparent;
  width: 100%;
  &:hover {
    background-color: #e5e8e8;
    cursor: pointer;
  }
}
</style>
