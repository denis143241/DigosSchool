<template>
  <div class="page-title">Учебник</div>
  <app-preloader v-if="isLoad" />
  <template v-else>
    <div class="book">
      <choose-test-card
        v-for="lesson in lessons?.fromUser"
        :key="lesson"
        :test="lesson"
      >
        <template #predicate-mine
          ><p :style="{ paddingRight: '5px' }">(свой)</p></template
        >
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
                @click="delFromOwnBook(lesson.title)"
                class="button waves-effect waves-light btn red darken-3"
              >
                Удалить
              </button>
            </div>
          </div>
        </template>
      </choose-test-card>
      <choose-test-card
        v-for="lesson in lessons?.fromGeneral"
        :key="lesson"
        :test="lesson"
      >
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
</template>

<script>
// На данный момент тесты удаляются но надо заного фетчить тесты чтобы увидеть резульат
// Начать делать редиректы
import { useRoute, useRouter } from "vue-router";
import { useBook } from "../use/book";

import chooseTestCard from "../components/chooseTestCard.vue";
import appPreloader from "../components/appPreloader.vue";
export default {
  components: {
    chooseTestCard,
    appPreloader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { data: lessons, isLoad, delFromOwnBook } = useBook();

    const redirectToLearn = (lesson) => {
      router.push(`${route.path}/${lesson.title}`);
    };
    const redirectToTest = (test) => {
      router.push(`/test/${test.title}`);
    };

    return { lessons, isLoad, delFromOwnBook, redirectToLearn, redirectToTest };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.book {
  margin-bottom: 100px;
}
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
