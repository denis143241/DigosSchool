<template>
  <app-popup ref="add_test_popup" :windowSize="'large'">
    <template #popup-header>
      <div class="popup-title">Выберите тесты</div>
    </template>
    <template #popup-content>
      <list-checkbox-item
        v-for="item in ownTests"
        :key="item._id"
        :title="item.title"
        :category="item.category"
        :language="item.language"
        :id="item._id"
        :isChecked="chosenTests.includes(item._id)"
        @update:id="chosenTestsHandler"
      />
    </template>
  </app-popup>
  <div class="page create-course_page">
    <div class="page-title">Создайте свой курс</div>
    <div class="page-content">
      <div class="row">
        <div class="col l8 m10 s12 offset-l2 offset-m1">
          <div class="input-field">
            <input type="text" id="name" />
            <label for="name">Название курса</label>
          </div>
          <div class="row">
            <div class="col m6 s12 half-row-block">
              <div class="page-subtitle">Добавьте тесты в курс</div>
              <table v-if="chosenTests.length > 0" class="the-table striped">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="test in chosenTests_detail" :key="test._id">
                    <td>{{ test.title }}</td>
                    <td>
                      <span
                        @click="removeTest(test._id)"
                        class="material-icons delete-icon"
                      >
                        close
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div @click="addTest" class="button btn waves-effect waves-light">
                Добавить
              </div>
            </div>
            <div class="col m6 s12 half-row-block">
              <div class="page-subtitle">Пригласите участников</div>
              <div class="button btn waves-effect waves-light">Пригласить</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import AppPopup from "../components/appPopup.vue";
import ListCheckboxItem from "../components/listCheckboxItem.vue";
import { useOwnTests } from "../use/ownTests";
export default {
  components: {
    AppPopup,
    ListCheckboxItem,
  },
  setup() {
    const add_test_popup = ref(null);
    const chosenTests = ref([]);
    let chosenTests_temp = [];
    const { data: ownTests } = useOwnTests();

    const chosenTests_detail = computed(() => {
      return ownTests.value?.filter((t) => chosenTests.value.includes(t._id));
    });

    const addTest = async () => {
      chosenTests_temp = [...chosenTests.value];
      const res = await add_test_popup.value.open();

      if (res) {
        chosenTests.value = [...chosenTests_temp];
        return;
      }

      chosenTests_temp = [];
    };

    const chosenTestsHandler = (event) => {
      if (event.target.checked) {
        chosenTests_temp.push(event.target.value);
        return;
      }

      chosenTests_temp = chosenTests_temp.filter(
        (v) => v !== event.target.value
      );
    };

    const removeTest = (test_id) => {
      chosenTests.value = chosenTests.value.filter((id) => id !== test_id);
    };

    return {
      chosenTests_detail,
      add_test_popup,
      ownTests,
      addTest,
      chosenTests,
      chosenTestsHandler,
      removeTest,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.page {
  &-subtitle {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 15px;
  }
}
.half-row-block {
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    border-right: 1.5px solid #4d4d4d;
  }
}
@media only screen and (max-width: 600px) {
  .half-row-block {
    &:not(:last-child) {
      border-right: none;
    }
  }
}
</style>
