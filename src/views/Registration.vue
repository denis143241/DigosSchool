<template>
  <app-alert
    v-if="alertData"
    :success="alertData.success"
    :message="alertData.message"
    @close="closeAlert"
  />
  <div class="form-wrapper">
    <div class="form-header">
      <p class="header">Регистрация</p>
    </div>
    <div class="input-field">
      <input
        v-model="form.login.value"
        :class="{ invalid: !form.login.valid && form.login.touched }"
        type="text"
        @blur="form.login.blur"
        id="login"
      />
      <label for="login">Логин</label>
      <small
        class="red-text text-darken-3"
        v-if="!form.login.valid && form.login.touched"
        >Поле должно быть заполнено</small
      >
    </div>
    <div class="input-field">
      <input
        v-model="form.password.value"
        type="password"
        :class="{ invalid: !form.password.valid && form.password.touched }"
        @blur="form.password.blur"
        id="paswword"
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
    <div class="input-field">
      <input
        v-model="form.name.value"
        :class="{ invalid: !form.name.valid && form.name.touched }"
        type="text"
        @blur="form.name.blur"
        id="name"
      />
      <label for="name">Имя</label>
      <small
        v-if="form.name.errors.required && form.name.touched"
        class="red-text text-darken-3"
        >Поле должно быть заполнено</small
      >
    </div>
    <select
      v-model="form.language.value"
      :class="{ invalid: !form.language.valid && form.language.touched }"
      id="rf"
      @blur="form.language.blur"
    >
      <option value="" disabled selected>{{ standartSelect }}</option>
      <option v-for="lang in languages" :key="lang" :value="lang">
        {{ lang }}
      </option>
    </select>
    <small v-if="form.language.errors.required && form.language.touched"
      >Поле должно быть заполнено</small
    >
    <div class="form-buttons">
      <button @click="registration" class="btn waves-effect waves-light">
        Сохранить
      </button>
    </div>
    <div class="form-addition-information right-align">
      <p>У вас уже есть аккаунт?</p>
      <router-link to="/login" class="fake-link">Вход</router-link>
    </div>
  </div>
</template>

<script>
import M from "../../node_modules/materialize-css";
import appAlert from "../components/appAlert.vue";
import { onMounted, ref } from "@vue/runtime-core";
import { api_post } from "../js/api_functions";
import { useRouter } from "vue-router";
import { useForm } from "../use/form";

const required = (val) => !!val;
const minLength = (num) => (val) => val.length >= num;
const maxLength = (num) => (val) => val.length <= num;

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
      name: {
        value: "",
        validators: { required },
      },
      language: {
        value: "",
        validators: { required },
      },
    });
    const languages = ["Английский", "Немецкий", "Испанский", "Французский"];
    const standartSelect = "Выберите язык";
    const user = ref({
      login: "",
      password: "",
      name: "",
      language: "",
    });
    const alertData = ref(null);

    onMounted(() => {
      M.AutoInit();
    });

    const registration = async () => {
      if (!form.valid) return;
      const Url = "/api/reg";
      const body = {
        login: form.login.value,
        password: form.password.value,
        language: form.language.value,
        name: form.name.value,
      };
      console.log(body);
      const res = await api_post(Url, "POST", body);
      alertData.value = res;
      if (res.err) {
        const additionErrors = res.err.errors.map((err) => err.msg).join(". ");
        alertData.value.message += `.  ${additionErrors}`;
        return;
      }
      if (!res.success) return;
      alertData.value.message +=
        ". Сейчас Вы будете перенаправлены на страницу авторизации";
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    };

    const closeAlert = () => {
      alertData.value = null;
    };

    return {
      languages,
      standartSelect,
      user,
      alertData,
      registration,
      closeAlert,
      form,
    };
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
