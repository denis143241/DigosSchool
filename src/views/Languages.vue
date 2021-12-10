<template>
  <div class="languages-block">
    <div class="row">
      <div v-for="lang in langs" :key="lang" class="col l3 m4 s12">
        <div class="card">
          <div class="item">
            {{ lang.lang }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const langs = [
      { lang: "Английский", picture: "" },
      { lang: "Немецкий", picture: "" },
      { lang: "Французкий", picture: "" },
      { lang: "Итальянский", picture: "" },
      { lang: "Испанский", picture: "" },
    ];

    return { langs };
  },
};
</script>

<style lang="less">
@import url("../assets/css/mainStyles.less");
</style>
