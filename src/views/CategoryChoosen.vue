<template>
  <choose-test-card
    @click="redirectToTest(test)"
    v-for="(test, idx) in data"
    :key="test"
    :test="test"
  >
    <template #action-button>
      <button
        v-if="!inBook[idx]"
        @click.stop
        @click="addToBook(test)"
        class="button waves-effect waves-dark btn"
      >
        Добавить в учебник
      </button>
      <span v-else class="material-icons"> done </span>
    </template>
  </choose-test-card>
</template>

<script>
// Переписан с использованием API ПОЧТИ
// Переписать функцию addToBook (необходим зарегестрированный пользователь)

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { searchOfCategory } from "../assets/js/searchOfCategory";

import chooseTestCard from "../components/chooseTestCard.vue";
import { api_get_auth, api_post_auth } from "../js/api_functions";
import { useFetch } from "../use/fetch";
export default {
  components: {
    chooseTestCard,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { response: data, request: fetchTests } = useFetch(
      `/api/category/${route.params.category}`
    );
    fetchTests();

    // onMounted(async () => {
    //   // data.value = searchOfCategory(store.state.AllTests, route.params.id);
    //   const Url = `/api/category/${route.params.category}`;
    //   data.value = await api_get(Url);
    // });

    const inBook = computed(() => {
      const output = [];
      data.value.forEach(async (test) => {
        const res = await api_get_auth(
          `/api/in-book/${test.title}`,
          localStorage.getItem("token")
        );
        output.push(res.inBook);
      });
      return output;
    });

    const addToBook = async (test) => {
      const Url = "/api/add-to-book";
      const res = await api_post_auth(
        Url,
        "POST",
        { title: test.title },
        localStorage.getItem("token")
      );
      console.log(res);
    };

    const redirectToTest = (test) => {
      router.push(`/test/${test.title}`);
    };

    return { data, redirectToTest, addToBook, inBook };
  },
};
</script>
