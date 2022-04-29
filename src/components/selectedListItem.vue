<template>
  <div class="selected-item">
    <slot></slot>
    <span @click="$emit('removeItem')" class="cross material-icons delete-icon">
      close
    </span>
  </div>
</template>

<script>
export default {
  emits: ["removeItem"],
};
</script>

<style lang="less" scoped>
.selected-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  min-width: 100px;
  max-width: 170px;
  min-height: 50px;
  border: 1px solid #82e0aa;
  background-color: #26a69928;
  margin: 7px;
}
.cross {
  font-size: 18px;
  position: absolute;
  top: 3px;
  right: 3px;
  &:hover {
    color: red;
    transform: scale(1.1);
    cursor: pointer;
  }
}
</style>
