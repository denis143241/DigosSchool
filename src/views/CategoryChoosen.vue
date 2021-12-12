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
        :key="isInBook"
        @click.stop
        @click="addToBook(test)"
        class="button waves-effect waves-dark btn"
      >
        Добавить в учебник
      </button>
      <span v-else :key="isInBook" class="material-icons"> done </span>
    </template>
  </choose-test-card>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { searchOfCategory } from "../assets/js/searchOfCategory";

import chooseTestCard from "../components/chooseTestCard.vue";
export default {
  components: {
    chooseTestCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      data.value = searchOfCategory(store.state.AllTests, route.params.id);
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
