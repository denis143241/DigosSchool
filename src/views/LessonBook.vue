<template>
  <div class="page-title">Учебник</div>
  <app-preloader v-if="isLoad" />
  <template v-else>
    <div v-if="data" class="book">
      <choose-test-card
        v-for="lesson in data.book"
        :key="lesson._id"
        :test="lesson"
      >
        <template v-if="!lesson.isGeneral" #predicate-mine
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
                @click="deleteFromBook(lesson._id)"
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
    const { userBook: data, fetchBook, deleteFromBook } = useBook();

    fetchBook(); // Загрузка тестов из книги

    const redirectToLearn = (lesson) => {
      router.push(`${route.path}/${lesson._id}`);
    };
    const redirectToTest = (test) => {
      router.push(`/test/${test._id}`);
    };

    return {
      data,
      deleteFromBook,
      redirectToLearn,
      redirectToTest,
    };
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
