<template>
  <app-alert
    v-if="alertData"
    :success="alertData.success"
    :message="alertData.message"
  />
  <div class="form-wrapper">
    <div class="form-header">
      <p class="header">Вход</p>
    </div>
    <input v-model="user.login" type="text" placeholder="Введите логин" />
    <input
      v-model="user.password"
      type="password"
      placeholder="Введите пароль"
    />
    <div class="form-buttons">
      <button @click="logIn" class="btn waves-effect waves-light">Войти</button>
    </div>
    <div class="form-addition-information right-align">
      <p>До сих пор нет аккаунта?</p>
      <router-link to="/registration" class="fake-link"
        >Регистрация</router-link
      >
    </div>
  </div>
</template>

<script>
import appAlert from "../components/appAlert.vue";
import { ref } from "@vue/runtime-core";
import { api_post } from "../js/api_functions";
export default {
  components: {
    appAlert,
  },
  setup() {
    const user = ref({
      login: "",
      password: "",
    });
    const alertData = ref(null);

    const logIn = async () => {
      const Url = "/api/auth";
      const res = await api_post(Url, "POST", user.value);
      alertData.value = res;
      if (res.err) {
        const additionErrors = res.err.errors.map((err) => err.msg).join(". ");
        alertData.value.message += `.  ${additionErrors}`;
      }
      console.log(res);
    };

    return { user, alertData, logIn };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.form-wrapper {
  background-color: #fff;
  min-height: 300px;
  border-radius: 10px;
  padding: 50px 50px 20px;
  box-shadow: 0 2px 2px 0 rgb(255, 255, 255, 14%),
    0 3px 1px -2px rgb(255, 255, 255, 12%), 0 1px 5px 0 rgb(255, 255, 255, 20%);
}
.form {
  &-header {
    text-align: center;
    font-family: @main-font;
    font-weight: 700;
    font-size: 30px;
    margin: 10px 0;
    & p {
      padding: 0;
      margin: 0;
    }
  }
  &-buttons {
    text-align: center;
    margin-top: 40px;
  }
  &-addition-information {
    margin-top: 30px;
    & p {
      display: inline-block;
      margin: 0;
      &.fake-link {
        color: rgb(20, 95, 192);
        font-weight: 600;
        margin-left: 10px;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
