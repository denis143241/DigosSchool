<template>
  <app-alert
    v-if="alertData"
    :success="alertData.success"
    :message="alertData.message"
    @close="closeAlert"
  />
  <div class="form-wrapper">
    <div class="form-header">
      <p class="header">Вход</p>
    </div>
    <div class="input-field">
      <input
        v-model="form.login.value"
        :class="{ invalid: !form.login.valid && form.login.touched }"
        type="text"
        id="login"
        @blur="form.login.blur"
      />
      <label for="login">Логин</label>
      <small
        class="red-text text-darken-3"
        v-if="form.login.errors.required && form.login.touched"
        >Поле должно быть заполнено</small
      >
    </div>
    <div class="input-field">
      <input
        v-model="form.password.value"
        type="password"
        :class="{ invalid: !form.password.valid && form.password.touched }"
        id="password"
        @blur="form.password.blur"
      />
      <label for="password">Пароль</label>
      <small
        v-if="form.password.errors.required && form.password.touched"
        class="red-text text-darken-3"
        >Поле должно быть заполнено</small
      >
      <small
        v-else-if="form.password.errors.minLength && form.password.touched"
        class="red-text text-darken-3"
        >Пароль должен быть более 3 символов</small
      >
      <small
        v-else-if="form.password.errors.maxLength && form.password.touched"
        class="red-text text-darken-3"
        >Пароль не может превышать 17 символов</small
      >
    </div>
    <div class="form-buttons">
      <button
        @click="logIn"
        :disabled="!form.valid"
        class="btn waves-effect waves-light"
      >
        Войти
      </button>
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
import { useRouter } from "vue-router";
import { storeUser } from "../js/autorization";
import { useForm } from "../use/form";
import { required, minLength, maxLength } from "../use/validators";
export default {
  components: {
    appAlert,
  },
  setup() {
    const router = useRouter();
    const form = useForm({
      login: {
        value: "",
        validators: { required },
      },
      password: {
        value: "",
        validators: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(17),
        },
      },
    });

    const alertData = ref(null);

    const logIn = async () => {
      if (!form.valid) return;

      const API_URL = "/api/user/auth";
      const res = await api_post(API_URL, "POST", {
        login: form.login.value,
        password: form.password.value,
      });

      alertData.value = res;

      if (res.err) {
        const additionErrors = res.err.errors.map((err) => err.msg).join(". ");
        alertData.value.message += `.  ${additionErrors}`;
        return;
      }
      if (!res.success) return;
      alertData.value.message = `Добро пожаловать ${res.user.username}`;
      storeUser(res.token, res.user);
      setTimeout(() => {
        router.push("/");
      }, 500);
    };

    const closeAlert = () => {
      alertData.value = null;
    };

    return { form, alertData, logIn, closeAlert };
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
