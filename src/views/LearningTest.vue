<template>
  <div class="lesson-page">
    <app-alert
      v-if="lesson.data === false"
      :success="alertSuccess"
      :message="alertMessage"
      :duration="1000 * 60"
      @close="closeAlert"
    />
    <div v-else class="row">
      <div class="col l8 m10 s12 offset-l2 offset-m1">
        <table class="striped" v-show="lesson.data !== null">
          <thead>
            <tr>
              <th>Слово</th>
              <th class="answer">Перевод</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="key in keys" :key="key">
              <td>{{ key }}</td>
              <td class="answer">
                {{ normalizeAnswer(lesson.data.words[key]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { useBook } from "../use/book";
import { keysFromObject } from "../assets/js/TestHandlers/testHandlers";
import AppAlert from "../components/appAlert.vue";
import { useAlert } from "../use/alert";
export default {
  components: {
    AppAlert,
  },
  setup() {
    let lesson = reactive({ data: null });
    console.log(lesson);
    const route = useRoute();
    let { alertSuccess, alertMessage } = useAlert();
    alertSuccess = false;
    alertMessage =
      "К сожалению в вашей учебной книге этого теста мы не нашли :(";
    const { getTestFromBook } = useBook();

    const keys = computed(() => {
      return lesson.data !== null && lesson.data !== undefined
        ? keysFromObject(lesson.data.words)
        : [];
    });

    onMounted(async () => {
      lesson.data = await getTestFromBook(route.params.id);
    });

    const normalizeAnswer = (arr) => {
      return arr.join(" / ");
    };

    const closeAlert = () => {
      lesson.data = null;
    };

    return {
      lesson,
      keys,
      alertSuccess,
      alertMessage,
      normalizeAnswer,
      closeAlert,
    };
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
