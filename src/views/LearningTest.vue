<template>
  <div class="lesson-page">
    <div class="row">
      <div class="col l8 m10 s12 offset-l2 offset-m1">
        <table class="striped">
          <thead>
            <tr>
              <th>Слово</th>
              <th class="answer">Перевод</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="key in keys" :key="key">
              <td>{{ key }}</td>
              <td class="answer">{{ lesson.words[key].join(" / ") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { searchTestOnTitle } from "../assets/js/searchTestOnTitle";
import { useStore } from "vuex";
import { keysFromObject } from "../assets/js/TestHandlers/testHandlers";
export default {
  setup() {
    const lesson = ref({});
    const route = useRoute();
    const store = useStore();
    const keys = ref([]);
    onMounted(() => {
      lesson.value = searchTestOnTitle(
        store.state.AllTests,
        route.params.title
      );
      keys.value = keysFromObject(lesson.value.words);
    });

    return { lesson, keys };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.lesson-page {
  font-family: @main-font;
  font-weight: 400;
  font-size: 18px;
  padding-bottom: 50px;
}
@media only screen and (max-width: 600px) {
  .lesson-page {
    font-size: 16px;
  }
  .answer {
    text-align: right;
  }
}
</style>
