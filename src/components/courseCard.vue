<template>
  <div class="card course-card">
    <div class="row">
      <div class="col l3 m3 s6">
        <div class="card-item title">
          {{ course.name }}
        </div>
      </div>
      <div class="col l3 m3 s6">
        <div class="card-item">
          Учитель:<strong> {{ course.creator.username }}</strong>
        </div>
      </div>
      <div class="col l3 m3 s6">
        <div class="card-item">
          Количество тестов:<strong> {{ course.tests.length }}</strong>
        </div>
      </div>
      <div class="col l3 m3 s6">
        <div class="card-item">Завершено:<strong> 50%</strong></div>
      </div>
      <div class="col s12">
        <div class="card-item">
          <!-- <app-preloader v-if="loading" /> -->
          <slot name="action-button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.course-card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70px;
  margin: 10px 0;
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
