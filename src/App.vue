<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue";
import LoginLayout from "./layouts/LoginLayout.vue";
export default {
  components: {
    MainLayout,
    LoginLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout
        ? this.$route.meta.layout + "-layout"
        : "error-layout";
    },
  },
};
</script>

<style lang="less">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
