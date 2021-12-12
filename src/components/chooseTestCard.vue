<template>
  <div class="card choose-test-card">
    <div class="row">
      <div class="col l3 m3 s6">
        <div class="card-item title">{{ test.title }}</div>
      </div>
      <div class="col l3 m3 s6">
        <div class="card-item">{{ test.category }}</div>
      </div>
      <div class="col l3 m3 s6">
        <div class="card-item">{{ test.language }}</div>
      </div>
      <div class="col l3 m3 s6">
        <div class="card-item">
          <div
            class="lightner"
            :class="{ 'lightner-red': !isDone, 'lightner-green': isDone }"
          ></div>
        </div>
      </div>
      <div class="col s12">
        <div class="card-item">
          <slot name="action-button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { isDoneFromLocalStorage } from "../assets/js/TestHandlers/testHandlers";
import { onMounted } from "@vue/runtime-core";
export default {
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isDone = ref(false);

    onMounted(() => {
      isDone.value = isDoneFromLocalStorage(props.test.title);
    });

    return { isDone };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.choose-test-card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70px;
  margin: 10px 0;
}
.lightner {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  &-red {
    background-color: red;
    box-shadow: 0 0 7px rgba(255, 0, 0, 80%);
  }
  &-green {
    background-color: #4aac4d;
    box-shadow: 0 0 7px #a5d6a7;
  }
}
.row {
  width: 100%;
  margin: 0;
}
.card-item {
  min-height: 40px;
}
.title {
  font-weight: 700;
}
@media only screen and (max-width: 600px) {
  .card-item {
    &:not(:last-child) {
      border-right: 1px solid @choosen-menu-options-color;
      padding-right: 7px;
    }
    &:not(:first-child) {
      padding-left: 10px;
    }
  }
}
</style>
