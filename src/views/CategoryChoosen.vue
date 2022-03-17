<template>
  <app-alert
    v-if="isShowAlert"
    :success="alertSuccess"
    :message="alertMessage"
    @close="isShowAlert = false"
  />
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
          v-if="!onlyIdInBook.includes(test._id)"
          @click.stop
          @click="addToBook_wrapper(test._id)"
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
import chooseTestCard from "../components/chooseTestCard.vue";
import appPreloader from "../components/appPreloader.vue";
import AppAlert from "../components/appAlert.vue";
import { computed, ref } from "@vue/reactivity";
import { useBook } from "../use/book";
import { useAlert } from "../use/alert";
export default {
  components: {
    chooseTestCard,
    appPreloader,
    AppAlert,
  },
  setup() {
    let {
      alertSuccess,
      alertMessage,
      showAlert,
      isShow: isShowAlert,
    } = useAlert();
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const { userBook, fetchBook, addToBook } = useBook();
    const onlyIdInBook = computed(() => {
      if (!userBook.value) return [];
      return userBook.value.book.map((obj) => obj._id);
    });
    fetchBook();

    const {
      response: data,
      request: fetchTests,
      isLoad: isLoadedTests,
    } = useFetch(`/api/test/category/${route.params.category}`);
    fetchTests();

    const redirectToTest = (test) => {
      router.push(`/test/${test._id}`);
    };

    const addToBook_wrapper = async (testId) => {
      loading.value = true;
      const { response } = await addToBook(testId);
      loading.value = false;

      // Настройка Alert окна
      if (response.value.success === false) {
        alertSuccess.value = response.value.success;
        alertMessage.value = response.value.message;
        showAlert();
      }
    };

    return {
      data,
      isLoadedTests,
      userBook,
      onlyIdInBook,
      alertSuccess,
      alertMessage,
      isShowAlert,
      redirectToTest,
      addToBook_wrapper,
    };
  },
};
</script>
