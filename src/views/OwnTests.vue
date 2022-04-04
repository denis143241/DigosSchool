<template>
  <app-preloader v-if="isTestLoad || isBookLoad" />
  <template v-else>
    <div class="cards">
      <choose-test-card
        @click="redirectToTest(test)"
        v-for="test in data"
        :key="test._id"
        :test="test"
      >
        <template #action-button>
          <button
            v-if="!onlyIdInBook.includes(test._id)"
            @click.stop
            @click="addToBook(test._id)"
            class="button waves-effect waves-dark btn"
          >
            Добавить в учебник
          </button>
          <span v-else class="material-icons"> done </span>
        </template>
      </choose-test-card>
    </div>
  </template>
</template>

<script>
import { useRouter } from "vue-router";
import { useOwnTests } from "../use/ownTests";
import chooseTestCard from "../components/chooseTestCard.vue";
import appPreloader from "../components/appPreloader.vue";
import { useBook } from "../use/book";

export default {
  components: {
    chooseTestCard,
    appPreloader,
  },
  setup() {
    const { data, isLoad: isTestLoad } = useOwnTests();
    const { onlyIdInBook, addToBook, isBookLoad } = useBook();
    const router = useRouter();

    const redirectToTest = (test) => {
      router.push(`/test/${test._id}`);
    };

    return {
      data,
      isTestLoad,
      isBookLoad,
      onlyIdInBook,
      redirectToTest,
      addToBook,
    };
  },
};
</script>

<style lang="less" scoped>
.cards {
  margin-bottom: 100px;
}
</style>
