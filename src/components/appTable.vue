<template>
  <table class="the-table striped">
    <thead>
      <tr>
        <slot name="header" />
        <th v-if="changeable"></th>
      </tr>
    </thead>
    <tbody>
      <slot name="content" />
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    changeable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
</style>
