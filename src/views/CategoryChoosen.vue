<template>
  <app-preloader v-if="isLoadedTests" />
  <template v-else>
    <choose-test-card
      @click="redirectToTest(test)"
      v-for="test in data"
      :key="test"
      :test="test"
    >
      <template #action-button>
        <button
          v-if="!generalBook?.data.includes(test.title)"
          @click.stop
          @click="addToBook(test.title)"
          class="button waves-effect waves-dark btn"
        >
          Добавить в учебник
        </button>
        <span v-else class="material-icons"> done </span>
      </template>
    </choose-test-card>
  </template>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useFetch } from "../use/fetch";
import { useGeneralBook } from "../use/generalBook";
import chooseTestCard from "../components/chooseTestCard.vue";
import appPreloader from "../components/appPreloader.vue";
export default {
  components: {
    chooseTestCard,
    appPreloader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const {
      data: generalBook,
      add: addToBook,
      isLoad: isLoadedBook,
    } = useGeneralBook();
    const {
      response: data,
      request: fetchTests,
      isLoad: isLoadedTests,
    } = useFetch(`/api/category/${route.params.category}`);
    fetchTests();

    const redirectToTest = (test) => {
      router.push(`/test/${test.title}`);
    };

    return {
      data,
      generalBook,
      isLoadedTests,
      isLoadedBook,
      redirectToTest,
      addToBook,
    };
  },
};
</script>
