<template>
  <choose-test-card
    @click="redirectToTest(test)"
    v-for="test in data"
    :key="test"
    :test="test"
  >
    <template #action-button>
      <button
        v-if="!inBook(test.title)"
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

import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// import { searchOfCategory } from "../assets/js/searchOfCategory";

import chooseTestCard from "../components/chooseTestCard.vue";
import { api_get } from "../js/api_functions";
export default {
  components: {
    chooseTestCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      // data.value = searchOfCategory(store.state.AllTests, route.params.id);
      const Url = `/api/category/${route.params.category}`;
      data.value = await api_get(Url);
    });

    const data = ref([]);

    const addToBook = (test) => {
      if (store.state.Book[test.title] === undefined) {
        store.commit("addToLearn", test.title);
      }
    };

    const redirectToTest = (test) => {
      router.push(`/test/${test.title}`);
    };
    const inBook = (title) => {
      return store.state.Book[title] !== undefined;
    };

    return { data, redirectToTest, addToBook, inBook };
  },
};
</script>
