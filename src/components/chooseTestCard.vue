<template>
  <div class="card choose-test-card">
    <div class="card-item">
      {{ test.title }}
    </div>
    <div class="card-item">
      {{ test.category }}
    </div>
    <div class="card-item">
      {{ test.language }}
    </div>
    <div class="card-item lightner-block">
      <div class="lightner"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less">
@import url("../assets/css/mainStyles.less");
.choose-test-card {
  display: flex;
  margin: 10px 0;
}
.lightner {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: red;
  box-shadow: 0 0 7px rgba(255, 0, 0, 80%);
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
