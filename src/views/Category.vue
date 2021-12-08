<template>
  <div class="row">
    <div v-for="category in categories" :key="category" class="col l3 m4 s6">
      <category-card :cardContent="category" />
    </div>
  </div>
</template>

<script>
import categoryCard from "../components/categoryCard.vue";
export default {
  components: {
    categoryCard,
  },
  setup() {
    const categories = [
      { title: "Тело человека", picture: "self_improvement" },
      { title: "Животные", picture: "pets" },
      { title: "Семья", picture: "family_restroom" },
      { title: "Еда", picture: "restaurant"}
    ];

    return { categories };
  },
};
</script>
