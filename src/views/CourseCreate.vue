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
  <app-popup
    ref="add_students_popup"
    :windowSize="'large'"
    @down="studentTools.cursorDown"
    @up="studentTools.cursorUp"
    @enter="studentTools.chooseElement"
  >
    <template #popup-header>
      <div class="popup-title">Поиск участников</div>
    </template>
    <template #popup-content>
      <app-input
        @update:modelValue="updateStudentSearch"
        :modelValue="searchStudent"
        :styles="{ width: '80%' }"
        :autocomplete="'off'"
        >Поиск</app-input
      >
      <select-list-item
        v-for="(suggest, index) in studentTools.contentList.value"
        :key="suggest._id"
        :styles="{ width: '80%' }"
        :selected="index === studentTools.listCursor.value"
        >{{ suggest.username }}</select-list-item
      >
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

              <app-table v-if="chosenTests.length > 0">
                <template #header>
                  <th>Название</th>
                </template>
                <template #content>
                  <app-table-row
                    v-for="test in chosenTests_detail"
                    :key="test._id"
                    @removeItem="removeTest(test._id)"
                  >
                    <template #tableRow>
                      <td>{{ test.title }}</td>
                    </template>
                  </app-table-row>
                </template>
              </app-table>

              <div @click="addTest" class="button btn waves-effect waves-light">
                Добавить
              </div>
            </div>
            <div class="col m6 s12 half-row-block">
              <div class="page-subtitle">Пригласите участников</div>
              <div
                @click="addStudents"
                class="button btn waves-effect waves-light"
              >
                Пригласить
              </div>
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
import SelectListItem from "../components/selectListItem.vue";
import AppTable from "../components/appTable.vue";
import AppTableRow from "../components/appTableRow.vue";
import AppInput from "../components/appInput.vue";
import { useOwnTests } from "../use/ownTests";
import { watchEffect } from "vue";
import { useFetch } from "../use/fetch";
import { usePopupTools } from "../use/popupTools";
export default {
  components: {
    AppPopup,
    ListCheckboxItem,
    SelectListItem,
    AppTable,
    AppTableRow,
    AppInput,
  },
  setup() {
    const SUGGEST_AMOUNT = 7;
    const add_test_popup = ref(null);
    const add_students_popup = ref(null);
    const chosenTests = ref([]);
    const searchStudent = ref("");
    let chosenTests_temp = [];
    const { data: ownTests } = useOwnTests();
    // let suggestedStudents = ref();
    const studentTools = usePopupTools();
    console.log(studentTools);

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

    const addStudents = async () => {
      const res = await add_students_popup.value.open();
      searchStudent.value = "";
      studentTools.contentList.value = [];
      if (res) {
        1;
      }
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

    const updateStudentSearch = (newValue) => {
      searchStudent.value = newValue;
    };

    const removeTest = (test_id) => {
      chosenTests.value = chosenTests.value.filter((id) => id !== test_id);
    };

    const suggestStudents = async (searchValue) => {
      studentTools.listCursor.value = null;

      if (searchValue === "") studentTools.contentList.value = [];

      const { response, request: getStudents } = useFetch(
        `api/user/uesrs-by-username/${searchValue}/${SUGGEST_AMOUNT}`
      );
      await getStudents();
      studentTools.contentList.value = response.value;
    };

    // const studentCursorDown = () => {
    //   studentsCursor.value !== studentsList.value.length - 1
    //     ? (studentsCursor.value += 1)
    //     : (studentsCursor.value = 0);
    // };

    // const studentCursorUp = () => {
    //   studentsCursor.value > 0
    //     ? (studentsCursor.value -= 1)
    //     : (studentsCursor.value = studentsList.value.length - 1);
    // };

    // const chooseStudent = () => {
    //   console.log(studen)
    // }

    watchEffect(() => suggestStudents(searchStudent.value));

    return {
      chosenTests_detail,
      add_test_popup,
      add_students_popup,
      ownTests,
      searchStudent,
      studentTools,
      updateStudentSearch,
      addTest,
      addStudents,
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
