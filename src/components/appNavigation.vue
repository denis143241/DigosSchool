<template>
  <nav id="nav">
    <div class="nav-wrapper">
      <div @click="listenerMenu" class="menu">
        <a href="#"><i class="material-icons">menu</i> </a>
      </div>
      <router-link class="brand-logo" to="/"
        >DIGOSSCHOOL<small class="notify-admin-row" v-if="isAdmin && adminMode">
          (admin)</small
        ></router-link
      >
      <ul class="right hide-on-med-and-down">
        <li v-if="isAdmin && !adminMode" @click="setAdminMode">
          <a href="#">Включить режим администратора</a>
        </li>
        <li v-if="isAdmin && adminMode" @click="disableAdminMode">
          <a href="#">Выключить режим администратора</a>
        </li>
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
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoles } from "../use/roles";

export default {
  emits: ["listenerMenu"],
  setup(_, { emit }) {
    const router = useRouter();
    const isSidebar = ref(false);
    const adminMode = ref(false);
    const { response: roles } = useRoles();

    const listenerMenu = () => emit("listenerMenu");
    const isSignIn = computed(() => {
      return localStorage.getItem("token") || false;
    });

    const isAdmin = computed(() => {
      if (roles.value === undefined || roles.value.success === false) {
        return false;
      }
      return roles.value.roles.includes("ADMIN");
    });

    const logout_exit = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    };

    onMounted(() => {
      adminMode.value = !!localStorage.getItem("adminMode");
    });

    const setAdminMode = () => {
      adminMode.value = true;
      localStorage.setItem("adminMode", true);
    };

    const disableAdminMode = () => {
      adminMode.value = false;
      localStorage.removeItem("adminMode");
    };

    return {
      isSidebar,
      isSignIn,
      isAdmin,
      adminMode,
      setAdminMode,
      disableAdminMode,
      listenerMenu,
      logout_exit,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
nav {
  background-color: transparent;
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
.notify-admin-row {
  font-size: 20px;
  margin-left: 10px;
}
@media only screen and (max-width: 600px) {
  .notify-admin-row {
    position: absolute;
    right: -90px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
