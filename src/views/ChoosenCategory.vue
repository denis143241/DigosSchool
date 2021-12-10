<template>
  <choose-test-card
    @click="redirectToTest(test)"
    v-for="test in data"
    :key="test"
    :test="test"
  />
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

    const redirectToTest = (test) => {
      router.push(`/test/${test.title}`);
    }

    return { data, redirectToTest };
  },
};
</script>
