<template>
  <div class="card category-card">
    <div class="card-item">
      {{ cardContent.title }}
    </div>
    <div class="card-item">
      <span class="material-icons"> {{ cardContent.picture }} </span>
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

span {
  font-size: 80px;
}
.category {
  &-card {
    display: flex;
    min-height: 130px;
    &:hover {
      cursor: pointer;
    }
  }
}

@media only screen and (max-width: 600px) {
  .category-card {
    flex-direction: column;
  }
}
</style>
