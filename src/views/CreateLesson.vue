<template>
  <div class="create-lesson">
    <div class="page-title">Создайте свой тест</div>
    <div class="row">
      <div class="col l8 m10 s12 offset-l2 offset-m1">
        <div class="row addition-info">
          <div class="col l4 m6 s12 title">
            <input
              v-model="testName"
              type="text"
              :class="{ invalid: errorsInputs.testName === false }"
              placeholder="Название"
            />
          </div>
          <div class="col l4 m6 s12 input-field">
            <select
              id="category"
              v-model="category"
              :class="{ invalid: errorsInputs.category === false }"
            >
              <option value="" disabled selected>Выберите категорию</option>
              <option
                v-for="category in $store.state.categories"
                :key="category"
                :value="category.title"
              >
                {{ category.title }}
              </option>
            </select>
          </div>
          <div class="col l4 m6 s12 input-field">
            <select
              v-model="lang"
              :class="{ invalid: errorsInputs.lang === false }"
            >
              <option value="" disabled selected>Выберите язык</option>
              <option
                v-for="lang in $store.state.languages"
                :key="lang"
                :value="lang"
              >
                {{ lang }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col l8 m10 s12 offset-l2 offset-m1">
        <table class="the-table striped">
          <thead>
            <tr>
              <th>Слово</th>
              <th class="answer">Перевод</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="key in keys" :key="key">
              <td>{{ key }}</td>
              <td class="answer">
                {{ dictionary[key].join(" / ")
                }}<span @click="deleteKey(key)" class="material-icons">
                  close
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  id="input-key"
                  required
                  v-model="inputKey"
                  class="create-lesson-input"
                  :class="{ invalid: wrongData }"
                  type="text"
                  placeholder="Слово"
                />
              </td>
              <td class="flex-td">
                <input
                  id="translate-input"
                  required
                  class="translate-input create-lesson-input"
                  :class="{ invalid: wrongData }"
                  v-for="(i, idx) in translatesFields"
                  :key="i"
                  v-model="inputsTranslates[idx]"
                  type="text"
                  placeholder="Перевод"
                />
                <button
                  @click="addField"
                  class="button btn waves-effect waves-light"
                  :class="{ disabled: translatesFields >= 5 }"
                >
                  + перевод
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="block center-align">
          <button
            @click="addToDictionary"
            class="button btn waves-effect waves-light"
          >
            Добавить
          </button>
        </div>
        <div class="block left-align">
          <button
            @click="createLesson"
            class="btn waves-effect waves-light grey darken-4"
          >
            Создать тест
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Переписан с использованием API

import M from "../../node_modules/materialize-css";
import { computed, ref } from "@vue/reactivity";
import { keysFromObject } from "../assets/js/TestHandlers/testHandlers";
import { nextTick, onMounted } from "@vue/runtime-core";
import { searchTestOnTitle } from "../assets/js/searchTestOnTitle";
import { useStore } from "vuex";
import { api_post } from "../js/api_functions";

// При создание теста необходимо сбрасывать отображение select поля!
// Ограничить создание пустого теста

export default {
  setup() {
    const store = useStore();
    const dictionary = ref({});
    const translatesFields = ref(1);
    const keys = computed(() => {
      return keysFromObject(dictionary.value);
    });
    const inputsTranslates = ref([]);
    const inputKey = ref("");
    const inputs = ref([]);
    const wrongData = ref(false);
    const category = ref("");
    const lang = ref("");
    const testName = ref("");
    const errorsInputs = ref({ testName: true, category: true, lang: true });

    onMounted(() => {
      M.AutoInit();
      subscribeToListenEnter();
    });

    const deleteKey = (key) => {
      delete dictionary.value[key];
    };
    const subscribeToListenEnter = () => {
      inputs.value = document.querySelectorAll(".translate-input");
      inputs.value.forEach((el) => {
        el.removeEventListener("keydown", addToDictionary_onEnter);
        el.addEventListener("keydown", addToDictionary_onEnter);
      });
    };
    const addField = () => {
      if (translatesFields.value <= 5) {
        translatesFields.value++;
        nextTick(() => subscribeToListenEnter());
      }
    };
    const addToDictionary_onEnter = (e) => {
      if (e.key === "Enter") {
        addToDictionary();
      }
    };
    const addToDictionary = () => {
      if (inputKey.value === "" || inputsTranslates.value.length < 1) {
        wrongData.value = true;
        return;
      }
      dictionary.value[inputKey.value] = [];
      inputsTranslates.value.forEach((el) => {
        dictionary.value[inputKey.value].push(el);
      });
      wrongData.value = false;
      inputKey.value = "";
      inputsTranslates.value = [];
      translatesFields.value = 1;
      nextTick(() => document.getElementById("input-key").focus());
    };
    const collectData = () => {
      return {
        title: testName.value,
        category: category.value,
        language: lang.value,
        words: dictionary.value,
      };
    };
    const isCorrectLesson = (lesson) => {
      if (lesson.title === "") {
        errorsInputs.value.testName = false;
        return false;
      }
      if (lesson.category === "") {
        alert("Выберите категорию!");
        return false;
      }
      if (lesson.language === "") {
        alert("Выберите язык!");
        return false;
      }
      return true;
    };
    const createLesson = async () => {
      const lesson = collectData();
      if (!isCorrectLesson(lesson)) {
        return;
      }
      if (searchTestOnTitle(store.state.AllTests, lesson.title) !== undefined) {
        return;
      }
      // Добавление во vuex!
      store.commit("pushToTests", lesson);
      // Конец Добавления во vuex!

      // Добавление в БД!
      const res = await api_post('/api/create-lesson', 'POST', lesson)
      console.log(res)
      // Доавление в БД конец!

      inputKey.value = "";
      testName.value = "";
      inputsTranslates.value = [];
      lang.value = "Выберите";
      category.value = "";
      dictionary.value = new Object();
      console.log(dictionary.value);
    };

    return {
      dictionary,
      translatesFields,
      keys,
      inputsTranslates,
      inputKey,
      wrongData,
      category,
      lang,
      testName,
      errorsInputs,
      addField,
      addToDictionary,
      deleteKey,
      createLesson,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.material-icons {
  vertical-align: middle;
  font-size: 20px;
  padding: 0 20px;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    color: red;
  }
}
.the-table {
  font-family: @main-font;
}
.answer {
  text-align: right;
}
.create-lesson-input {
  flex: 1 1 1px;
  &:not(:last-child) {
    margin-right: 20px;
  }
}
.create-lesson {
  padding-bottom: 50px;
}
.block {
  margin: 30px 0 50px;
}
.flex-td {
  display: flex;
}
.flex-item {
  flex: 1 1 1px;
}
.input-field {
  margin: 0;
}
@media only screen and (max-width: 600px) {
  .flex-td {
    flex-direction: column;
    align-items: center;
  }
}
</style>
