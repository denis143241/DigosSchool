<template>
  <nav id="nav">
    <div class="nav-wrapper">
      <div @click="listenerMenu" class="menu">
        <a href="#"><i class="material-icons">menu</i> </a>
      </div>
      <router-link class="brand-logo" to="/">DIGOSSCHOOL</router-link>
      <ul class="right hide-on-med-and-down">
        <li v-if="isSignIn"><a href="#">Профиль</a></li>
        <li v-if="isSignIn" @click="logout_exit">
          <a href="#">Выйти</a>
        </li>
        <li v-else><router-link to="/login" href="#">Войти</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
// import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";
export default {
  emits: ["listenerMenu"],
  setup(_, { emit }) {
    const router = useRouter();
    const isSidebar = ref(false);
    const listenerMenu = () => emit("listenerMenu");
    const isSignIn = computed(() => {
      return localStorage.getItem("token") || false;
    });

    const logout_exit = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    };

    return { isSidebar, isSignIn, listenerMenu, logout_exit };
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
