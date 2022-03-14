<template>
  <div class="row">
    <div
      v-for="category in paginatedCategories"
      :key="category"
      class="col l3 m4 s6"
    >
      <category-card
        @click="$router.push(`/category/${category.title}`)"
        :cardContent="category"
      />
    </div>
  </div>
  <div v-if="amountPages > 1" class="pagination-block">
    <ul class="pagination">
      <li @click="prevPage" :class="{ disabled: page === 0 }">
        <a href="#!"><i class="material-icons">chevron_left</i></a>
      </li>
      <li
        id="pagination_number"
        v-for="i in amountPages"
        :key="i"
        @click="page = i - 1"
        class="waves-effect"
        :class="{ active: page === i - 1 }"
      >
        <a>{{ i }}</a>
      </li>
      <li @click="nextPage" :class="{ disabled: page === amountPages - 1 }">
        <a href="#!"><i class="material-icons">chevron_right</i></a>
      </li>
    </ul>
  </div>
</template>

<script>
// Создать в БД категории и загружать на клиент их из БД
import categoryCard from "../components/categoryCard.vue";
import { ref, computed } from "vue";
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
      { title: "Чувства", picture: "emoji_emotions" },
      { title: "Цвета", picture: "palette" },
      { title: "Время", picture: "watch_later" },
      { title: "Инструменты", picture: "build" },
      { title: "Размеры", picture: "photo_size_select_small" },
      { title: "Дом", picture: "cottage" },
      { title: "Кухня", picture: "soup_kitchen" },
      { title: "Здоровье", picture: "health_and_safety" },
      { title: "Город", picture: "apartment" },
      { title: "География", picture: "location_on" },
      { title: "Океан", picture: "sailing" },
      { title: "Природа", picture: "spa" },
      { title: "Погода", picture: "thermostat" },
      { title: "Птицы", picture: "flutter_dash" },
      { title: "Насекомые", picture: "pest_control" },
      { title: "Цветы", picture: "local_florist" },
      { title: "Транспорт", picture: "local_shipping" },
      { title: "Образование", picture: "school" },
      { title: "Космос", picture: "star_rate" },
      { title: "Другое", picture: "alt_route" },
      { title: "Мои уроки", picture: "account_circle" },
    ];
    const page = ref(0); // 0-5 ; 6-11 ; 12-17
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
    const amountOnPage = computed(() => {
      // h - не всегда число, если перейти на эту вкладку через url то не считываются id section и nav
      let h =
        document.getElementById("section")?.clientHeight -
        document.getElementById("nav")?.clientHeight -
        60;
      return Math.floor((isNaN(h) ? 340 : h) / 170) * amountOnWidth.value;
    });
    const paginatedCategories = computed(() =>
      categories.slice(
        page.value * amountOnPage.value,
        (page.value + 1) * amountOnPage.value
      )
    );
    const amountPages = ref(Math.ceil(categories.length / amountOnPage.value));
    const prevPage = () => {
      if (page.value !== 0) page.value--;
    };
    const nextPage = () => {
      if (page.value !== amountPages.value - 1) page.value++;
    };

    return {
      categories,
      paginatedCategories,
      amountPages,
      page,
      prevPage,
      nextPage,
    };
  },
};
</script>

<style lang="less" scoped>
.pagination-block {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 992px) {
  .pagination-block {
    padding-bottom: 50px;
  }
}
</style>

<style lang="less">
@import url("../assets/css/mainStyles.less");
.pagination li.active {
  background-color: @choosen-menu-options-color;
}
</style>
