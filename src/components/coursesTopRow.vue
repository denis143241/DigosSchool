<template>
  <div class="top-row">
    <button class="button btn waves-effect waves-ligth top-row__item">
      Создать курс
    </button>
    <div class="search-area top-row__item">
      <slot name="search" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-row {
  display: flex;
  width: 100%;
  padding: 15px 20px;
  &__item {
    flex-grow: 1;
    &:not(:last-child) {
      margin-right: 50px;
    }
  }
}
.button {
  max-width: 200px;
}
.search-area {
  max-width: 400px;
}
</style>
