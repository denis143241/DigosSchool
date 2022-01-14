<template>
  <template v-if="isloaded">
    <div class="cards">
      <choose-test-card
        @click="redirectToTest(test)"
        v-for="test in data"
        :key="test"
        :test="test"
      >
        <template #action-button>
          <button
            v-if="!ownBook.ownBook.includes(test.title)"
            @click.stop
            @click="addToBook(test.title)"
            class="button waves-effect waves-dark btn"
          >
            Добавить в учебник
          </button>
          <span v-else class="material-icons"> done </span>
        </template>
      </choose-test-card>
    </div>
  </template>
  <app-preloader v-else />
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useOwnBook } from "../use/ownBook";
import { useOwnTests } from "../use/ownTests";
import chooseTestCard from "../components/chooseTestCard.vue";
import appPreloader from "../components/appPreloader.vue";

export default {
  components: {
    chooseTestCard,
    appPreloader,
  },
  setup() {
    const { data: ownBook, add: addToBook } = useOwnBook();
    const { data } = useOwnTests();
    const router = useRouter();
    const isloaded = computed(() => {
      console.log(ownBook.value?.ownBook);
      return ownBook.value?.ownBook;
    });

    const redirectToTest = (test) => {
      router.push(`/test/own_${test.title}`);
    };

    return { data, redirectToTest, addToBook, ownBook, isloaded };
  },
};
</script>

<style lang="less" scoped>
.cards {
  margin-bottom: 100px;
}
</style>
