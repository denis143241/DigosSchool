<template>
  <app-preloader v-if="loading" />
  <template v-else>
    <template v-if="counter != words.length">
      <div
        class="progress"
        :style="{ width: `${(counter / words.length) * 100}%` }"
      ></div>
      <div
        class="wrapper"
        :class="{
          'true-answer': isBgGreen === true,
          'false-answer': isBgGreen === false,
          'common-bg': isBgGreen === null,
        }"
      >
        <div class="test-place">
          <div class="flex-container">
            <div class="word">
              <p>{{ words[counter] }}</p>
            </div>
            <div class="centered-content">
              <div class="answer-block">
                <input
                  autocomplete="off"
                  id="answer"
                  v-model="answer"
                  placeholder="Введите ответ"
                />
                <span @click="handlerAnswer" class="material-icons">
                  arrow_forward_ios
                </span>
              </div>
              <transition name="bounce">
                <div v-if="showAnswer" class="correct-answers">
                  <p>Правильно: {{ corrected }}</p>
                </div>
              </transition>
            </div>
            <div class="skip">
              <ul>
                <li><p @click="skip">Пропустить</p></li>
                <li><p @click="showAnswer = true">Показать ответ</p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="results">
        <div class="title">Тест завершен.</div>
        <p class="results-description">
          Вы набрали {{ score }} из {{ words.length }}
        </p>
        <div class="btns">
          <button
            @click="addBookAndRedirectToBook($route.params.title)"
            class="button btn waves-effect waves-light grey darken-4"
          >
            В учебник
          </button>

          <button @click="tryAgain" class="button btn waves-effect waves-light">
            Пробовать ещё
          </button>
        </div>
      </div>
    </template>
  </template>
</template>

<script>
// Переписан с использованием API
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import { api_get_auth } from "../js/api_functions";
// import { searchTestOnTitle } from "../assets/js/searchTestOnTitle";

import {
  keysFromObject,
  CompareAnswer,
  shakeArray,
} from "../assets/js/TestHandlers/testHandlers";
import appPreloader from "../components/appPreloader.vue";

export default {
  components: {
    appPreloader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const test = ref({});
    const words = ref([]);
    const answer = ref("");
    const score = ref(0);
    const withError = ref(false);
    const showAnswer = ref(false);
    let isBgGreen = ref(null);

    let counter = ref(0);

    onMounted(async () => {
      // Загрузка теста и его составляющих
      // test.value = searchTestOnTitle(store.state.AllTests, route.params.title);

      // const devidedTitle = route.params.title.split("_");
      // if (devidedTitle.length > 1 && devidedTitle.includes("own")) {
      //   // Ищем собственные тесты
      //   const Url = `/api/own-test/${devidedTitle[1]}`;
      //   const handledRes = await api_get_auth(
      //     Url,
      //     localStorage.getItem("token")
      //   );
      //   test.value = handledRes.test;
      // } else {
      //   // Ищем среди общих тестов
      //   const Url = `/api/test/${route.params.title}`;
      //   test.value = await api_get(Url);
      // }
      const API_URL = `/api/test/${route.params.id}`;
      test.value = await api_get_auth(API_URL, localStorage.getItem("token"));
      console.log(test.value);
      words.value = keysFromObject(test.value.words);
      words.value = shakeArray(words.value);

      // Подписка на события
      document.addEventListener("keydown", enterListener);
    });

    onUnmounted(() => {
      // Отписка от событий
      document.addEventListener("keydown", enterListener);
    });

    const key = computed(() => words.value[counter.value]);
    const corrected = computed(() => test.value.words[key.value].join("/"));
    const loading = computed(() => Object.keys(test.value).length === 0);

    watch(showAnswer, (newValue) => {
      if (newValue) {
        withError.value = true;
      }
    });
    watch(score, (newValue) => {
      if (newValue >= words.value.length) {
        setComplete(route.params.title);
      }
    });

    const handlerAnswer = () => {
      if (counter.value === words.value) {
        // Условия при которых не нужно обрабатывать ответ
        return;
      }
      const isTrueAnswer = CompareAnswer(
        answer.value,
        test.value.words[key.value]
      );
      if (isTrueAnswer) {
        counter.value++;
        isBgGreen.value = true;
        answer.value = "";
        showAnswer.value = false;
        if (!withError.value) {
          score.value++;
          withError.value = false;
        }
      }
      if (!isTrueAnswer) {
        isBgGreen.value = false;
        answer.value = "";
        withError.value = true;
      }
    };
    const enterListener = (e) => {
      // Обработка ответа по клавише Enter
      if (e.key !== "Enter") {
        return;
      }
      handlerAnswer();
    };
    const skip = () => {
      isBgGreen.value = false;
      counter.value += 1;
      showAnswer.value = false;
      withError.value = false;
    };
    const addBookAndRedirectToBook = (testName) => {
      if (store.state.Book[testName] === undefined) {
        store.commit("addToLearn", testName);
      }
      redirectToBook(testName);
    };
    const redirectToBook = (testName) => {
      router.push(`/lesson-book/${testName}`);
    };
    const tryAgain = () => {
      counter.value = 0;
      isBgGreen.value = null;
      withError.value = false;
      score.value = 0;
      words.value = shakeArray(words.value);
    };
    const setComplete = (nameTest) => {
      localStorage.setItem(nameTest, true);
    };

    return {
      words,
      counter,
      answer,
      isBgGreen,
      handlerAnswer,
      skip,
      showAnswer,
      corrected,
      score,
      addBookAndRedirectToBook,
      tryAgain,
      loading,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.bounce-enter-active {
  animation: bounceIn 1s;
}
.bounce-leave-active {
  animation: bounceIn 0.5s reverse;
}
@keyframes bounceIn {
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
p {
  margin: 0;
}
.wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  transition: 0.25s;
  border-radius: 30px 0 0 0;
  height: 100%;
  width: 100%;
}
.test-place {
  width: 70%;
  max-width: 400px;
  padding-bottom: 100px;
  margin-top: 100px;
  & .centered-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  & .correct-answers {
    font-size: 20px;
    font-family: @dop-font;
    letter-spacing: 0.4px;
  }
  & .answer-block {
    width: 100%;
    display: flex;
    align-items: center;
    #answer {
      font-family: @dop-font;
      font-weight: 400;
      &:hover {
        cursor: inherit;
      }
      &:focus {
        border-bottom: 1px solid @choosen-menu-options-color;
        box-shadow: 0 1px 0 0 @choosen-menu-options-color;
      }
      &::placeholder {
        color: rgb(0, 0, 0);
        font-style: italic;
        font-weight: 300;
      }
    }
    & span {
      width: 50px;
      line-height: 120%;
      text-align: center;
      background-color: green;
      color: #fff;
      border-radius: 10px;
      margin-left: 20px;
      transition: 0.25s;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }
  & ul {
    display: flex;
    justify-content: center;
    align-items: center;
    & li {
      padding: 0 20px;
      & p {
        margin: 0;
        position: relative;
        transition: 0.25s;
        user-select: none;
        &::after {
          content: "";
          width: 100%;
          height: 1px;
          background-color: @choosen-menu-options-color;
          position: absolute;
          top: 110%;
          left: 0;
          border-radius: 5px;
          opacity: 0;
          transition: 0.25s;
        }
        &:hover {
          cursor: pointer;
          &::after {
            opacity: 1;
          }
        }
      }
    }
  }
}
.results {
  & .title {
    text-align: center;
    font-family: @main-font;
    font-size: 35px;
    font-weight: 700;
    margin: 30px 0;
  }
  &-description {
    text-align: center;
    font-family: @main-font;
    font-size: 18px;
    font-weight: 500;
  }
  & .btns {
    text-align: center;
    margin: 40px 0;
    & .button {
      margin: 0 20px;
    }
  }
}
.flex-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.word {
  font-family: @main-font;
  text-align: center;
  margin-bottom: 50px;
  & p {
    margin: 0;
    font-size: 40px;
    font-weight: 800;
  }
}
.progress {
  transition: 0.25s;
  height: 5px;
  background-color: #ffd54f;
  border-radius: 5px;
  z-index: 1;
}

// Wrapper's colors
.true-answer {
  background-color: #7dcea0;
}
.false-answer {
  background-color: #f5b7b1;
}
.common-bg {
  background-color: rgba(0, 0, 0, 0);
}

@media only screen and (max-width: 600px) {
  .word {
    & p {
      font-size: 30px;
    }
  }
  .test-place {
    margin-top: 60px;
  }
}
</style>
