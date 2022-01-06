<template>
  <div class="page-title">Учебник</div>
  <div class="book">
    <choose-test-card v-for="lesson in lessons" :key="lesson" :test="lesson">
      <template #action-button>
        <div class="row">
          <div class="col m2 s12">
            <button
              @click.stop
              @click="redirectToLearn(lesson)"
              class="button waves-effect waves-dark btn"
            >
              Учить
            </button>
          </div>

          <div class="col m2 s12">
            <button
              @click.stop
              @click="redirectToTest(lesson)"
              class="button waves-effect waves-dark btn"
            >
              Пройти тест
            </button>
          </div>
          <div class="col m2 s12 offset-m3">
            <button
              @click.stop
              @click="deleteLesson(lesson)"
              class="button waves-effect waves-light btn red darken-3"
            >
              Удалить
            </button>
          </div>
        </div>
      </template>
    </choose-test-card>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { searchTestOnTitle } from "../assets/js/searchTestOnTitle";

import chooseTestCard from "../components/chooseTestCard.vue";
export default {
  components: {
    chooseTestCard,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const lessons = computed(() => {
      return fetchTests();
    });

    const fetchTests = () => {
      const tests = [];
      for (let key in store.state.Book) {
        // Тут надо обращатся к конкретному Юзеру в БД и брать у него параметр Book
        let test = searchTestOnTitle(store.state.AllTests, key);
        tests.push(test);
      }
      return tests;
    };
    const deleteLesson = (lesson) => {
      store.commit("deleteLesson", lesson);
    };
    const redirectToLearn = (lesson) => {
      router.push(`${route.path}/${lesson.title}`);
    };
    const redirectToTest = (test) => {
      router.push(`/test/${test.title}`);
    };

    return { lessons, deleteLesson, redirectToLearn, redirectToTest };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.button {
  margin: 10px 20px;
}
@media only screen and (max-width: 600px) {
  .button {
    margin: 5px;
    width: 100%;
  }
}
</style>
