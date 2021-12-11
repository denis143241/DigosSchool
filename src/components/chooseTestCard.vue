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
        <div class="card-item"><div class="lightner"></div></div>
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
export default {
  props: {
    test: {
      type: Object,
      required: true,
    },
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
  background-color: red;
  box-shadow: 0 0 7px rgba(255, 0, 0, 80%);
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
