<template>
  <div class="page-title">Учебник</div>
  <div class="book">
    <choose-test-card v-for="lesson in lessons" :key="lesson" :test="lesson">
      <template #action-button>
        <button
          @click.stop
          @click="redirectToLearn(lesson)"
          class="button waves-effect waves-dark btn"
        >
          Учить
        </button>
        <button
          @click.stop
          @click="redirectToTest(lesson)"
          class="button waves-effect waves-dark btn"
        >
          Пройти тест
        </button>
        <button
          @click.stop
          @click="deleteLesson(lesson)"
          class="button waves-effect waves-light btn red darken-3"
        >
          Удалить
        </button>
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
</style>
