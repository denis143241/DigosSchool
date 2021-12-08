<template>
  <main-layout>
    <router-view />
  </main-layout>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue";
export default {
  components: {
    MainLayout,
  },
};
</script>

<style lang="less">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
