<template>
  <tr>
    <slot name="tableRow" />
    <td v-if="changeable">
      <span @click="$emit('removeItem')" class="material-icons delete-icon">
        close
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    changeable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["removeItem"],
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
</style>
