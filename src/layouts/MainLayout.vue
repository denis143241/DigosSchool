<template>
  <div class="main-layout">
    <app-navigation @listenerMenu="isSidebar = !isSidebar" />
    <div class="row content-place">
      <div v-if="isSidebar" class="col l2 s12 slidenav-place">
        <div class="sidebar white-text">
          <ul>
            <li class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/' }"
              >
                <span class="material-icons"> home </span>
              </div>
              <router-link to="/"><p>Главная</p></router-link>
            </li>
            <li class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/category' }"
              >
                <span class="material-icons"> category </span>
              </div>
              <router-link to="/category"><p>Категории</p></router-link>
            </li>
            <li class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/resent' }"
              >
                <span class="material-icons"> restore </span>
              </div>
              <router-link to="/resent"><p>Пройденные</p></router-link>
            </li>
            <li class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/create-lesson' }"
              >
                <span class="material-icons"> create </span>
              </div>
              <router-link to="/create-lesson"><p>Создать тест</p></router-link>
            </li>
            <li class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/lesson-book' }"
              >
                <span class="material-icons"> menu_book </span>
              </div>
              <router-link to="/lesson-book"><p>Учебник</p></router-link>
            </li>
            <li class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/chedule' }"
              >
                <span class="material-icons"> today </span>
              </div>
              <router-link to="/chedule"><p>Построить план</p></router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col s12 router-place" :class="{ l10: isSidebar }">
        <section id="section">
          <router-view />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import appNavigation from "../components/appNavigation.vue";
export default {
  components: {
    appNavigation,
  },
  setup() {
    const isSidebar = ref(true);

    return { isSidebar };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.visible-if-choosen {
  min-width: 60px;
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  border-radius: 0 10px 10px 0;
  padding: 5px 10px 5px 0;
}

.active-tab {
  background-color: @choosen-menu-options-color;
}
li {
  margin: 20px 0;
  &:hover {
    background-color: @choosen-menu-options-color;
    border-radius: 0 30px 30px 0;
  }
}
ul {
  margin: 40px 20px 0 0;
}
p {
  margin: 0 0 0 10px;
  padding: 0;
  line-height: 24px;
}
.menu-option {
  display: flex;
  align-items: center;
  font-size: 24px;
  & a {
    color: @nav-color;
  }
}
.slidenav-place {
  padding: 0 !important;
  font-family: @dop-font;
  font-weight: 300;
  letter-spacing: 0px;
}
.content-place {
  height: 100%;
}
.router-place {
  position: relative;
  height: 100%;
  padding: 0 !important;
}
.main-layout {
  height: 100vh;
  overflow: hidden;
  background-color: @main-bg-color;
}
.sidebar {
  padding-left: 0;
}
</style>
