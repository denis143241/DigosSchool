<template>
  <nav>
    <div class="nav-wrapper">
      <div @click="listenerMenu" class="menu">
        <a href="#"><i class="material-icons">menu</i> </a>
      </div>
      <router-link class="brand-logo" to="/">DIGOSSCHOOL</router-link>
      <ul class="right hide-on-med-and-down">
        <li><a href="#">Профиль</a></li>
        <li><a href="#">Выйти</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
// import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";
export default {
  emits: ["listenerMenu"],
  setup(_, { emit }) {
    const isSidebar = ref(false);
    const listenerMenu = () => emit("listenerMenu");

    return { isSidebar, listenerMenu };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
nav {
  background-color: rgba(0, 0, 0, 0);
  padding: 0 30px;
  box-shadow: none !important;
}
.nav-wrapper {
  vertical-align: middle;
}
.brand-logo {
  font-family: @dop-font;
}
.menu {
  display: inline-block;
  margin-right: 30px;
  top: 0;
  left: 0;
  & .material-icons {
    font-size: 30px;
  }
}
</style>
