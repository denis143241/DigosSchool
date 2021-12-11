<template>
  <div class="languages-block">
    <div class="row">
      <div
        v-for="lang in langs"
        :key="lang.lang"
        @click="setLanguage(lang.lang)"
        class="col l3 m4 s12"
      >
        <div class="card lang-card">
          <div class="card-item">
            <p>{{ lang.lang }}</p>
          </div>
          <div class="card-item">
            <img class="lang-img" :src="lang.picture" alt="" />
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
      { lang: "Английский", picture: require("../assets/En.svg") },
      { lang: "Немецкий", picture: require("../assets/Ge.svg") },
      { lang: "Французкий", picture: require("../assets/Fr.svg") },
      // { lang: "Итальянский", picture: require("../assets/It.svg") },
      { lang: "Испанский", picture: require("../assets/Sp.svg") },
    ];

    const setLanguage = (lang) => {
      localStorage.setItem("language", lang);
    }

    return { langs, setLanguage };
  },
};
</script>

<style lang="less">
@import url("../assets/css/mainStyles.less");
.bg-image {
  height: 100%;
  width: 100%;
  background-size: 100%;
}
.lang-card {
  display: flex;
  padding: 0 !important;
}
.card-item {
  position: relative;
  display: flex;
  overflow: hidden;
}
.lang-img {
  height: 100%;
  width: 100%;
  border-radius: 0 10px 10px 0;
}
</style>
