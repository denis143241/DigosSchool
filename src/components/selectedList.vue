<template>
  <div class="selected-horizontal-list" :style="styles">
    <slot></slot>
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
.selected-horizontal-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
