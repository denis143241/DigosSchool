<template>
  <div class="row">
    <div
      v-for="category in pagginatedCategories"
      :key="category"
      class="col l3 m4 s6"
    >
      <category-card :cardContent="category" />
    </div>
  </div>
</template>

<script>
import categoryCard from "../components/categoryCard.vue";
import { computed } from "vue";
export default {
  components: {
    categoryCard,
  },
  setup() {
    const categories = [
      { title: "Тело человека", picture: "self_improvement" },
      { title: "Животные", picture: "pets" },
      { title: "Семья", picture: "family_restroom" },
      { title: "Еда", picture: "restaurant" },

      { title: "Тело человека", picture: "self_improvement" },
      { title: "Животные", picture: "pets" },
      { title: "Семья", picture: "family_restroom" },
      { title: "Еда", picture: "restaurant" },
      { title: "Тело человека", picture: "self_improvement" },
      { title: "Животные", picture: "pets" },
      { title: "Семья", picture: "family_restroom" },
      { title: "Еда", picture: "restaurant" },
      { title: "Тело человека", picture: "self_improvement" },
      { title: "Животные", picture: "pets" },
      { title: "Семья", picture: "family_restroom" },
      { title: "Еда", picture: "restaurant" },
      { title: "Тело человека", picture: "self_improvement" },
      { title: "Животные", picture: "pets" },
      { title: "Семья", picture: "family_restroom" },
      { title: "Еда", picture: "restaurant" },
    ];
    console.log(
      document.getElementById("section").clientHeight -
        document.getElementById("nav").clientHeight
    );
    console.log(document.body.clientHeight)
    const page = 0; // 0-5 ; 6-11 ; 12-17
    const amountOnWidth = computed(() => {
      let devices = [600, 992, 1200];
      let clientWidth = document.body.clientWidth;
      let amount = null;
      for (let i = 0; i < devices.length; i++) {
        if (clientWidth < devices[i]) {
          amount = i + 2;
        }
        if (i === devices.length - 1 && amount === null) {
          amount = i + 2;
        }
      }
      return amount;
    });
    const amountOnPage = computed(
      () =>
        Math.floor(
          (document.getElementById("section").clientHeight -
            document.getElementById("nav").clientHeight - 60) /
            170
        ) * amountOnWidth.value
    );
    const pagginatedCategories = computed(() =>
      categories.slice(
        page * amountOnPage.value,
        (page + 1) * amountOnPage.value
      )
    );
    return { categories, pagginatedCategories };
  },
};
</script>
