<template>
  <div class="card">
    <div class="row category-row">
      <div class="col m6 flex-centered-block">
        <div class="title-block">
          <p>{{ cardContent.title }}</p>
        </div>
      </div>
      <div class="col m6 flex-centered-block">
        <div class="illustration">
          <span class="material-icons"> {{ cardContent.picture }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardContent: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.title-block {
  font-size: 16px;
}
span {
  font-size: 80px;
}
.category-row {
  margin: 0;
  height: 130px;
}
</style>
