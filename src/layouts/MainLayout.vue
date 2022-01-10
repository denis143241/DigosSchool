<template>
  <app-popup
    @closePopup="closePopup"
    @confirm="confirm"
    :title="'Оцените нас'"
    v-if="popup"
  >
    <template #popup-content>
      <form>
        <div class="rating">
          <img
            class="star"
            v-for="(i, idx) in rating"
            :key="i"
            :src="i"
            @click="rate(idx)"
          />
        </div>
        <textarea
          class="textarea"
          placeholder="Мы ждем ваших пожеланий"
        ></textarea>
      </form>
    </template>
  </app-popup>
  <div class="main-layout">
    <app-navigation @listenerMenu="isSidebar = !isSidebar" />
    <div class="row content-place">
      <div v-if="isSidebar" class="col l2 s12 slidenav-place">
        <div class="sidebar white-text">
          <ul>
            <li @click="hideSidebar_notDesktop" class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/' }"
              >
                <span class="material-icons"> home </span>
              </div>
              <router-link to="/"><p>Главная</p></router-link>
            </li>
            <li @click="hideSidebar_notDesktop" class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/category' }"
              >
                <span class="material-icons"> category </span>
              </div>
              <router-link to="/category"><p>Категории</p></router-link>
            </li>
            <li @click="hideSidebar_notDesktop" class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/resent' }"
              >
                <span class="material-icons"> restore </span>
              </div>
              <router-link to="/resent"><p>Пройденные</p></router-link>
            </li>
            <li @click="hideSidebar_notDesktop" class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/create-lesson' }"
              >
                <span class="material-icons"> create </span>
              </div>
              <router-link to="/create-lesson"><p>Создать тест</p></router-link>
            </li>
            <li @click="hideSidebar_notDesktop" class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/lesson-book' }"
              >
                <span class="material-icons"> menu_book </span>
              </div>
              <router-link to="/lesson-book"><p>Учебник</p></router-link>
            </li>
            <li @click="hideSidebar_notDesktop" class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/chedule' }"
              >
                <span class="material-icons"> today </span>
              </div>
              <router-link to="/chedule"><p>Построить план</p></router-link>
            </li>
            <li @click="hideSidebar_notDesktop" class="menu-option">
              <div
                class="visible-if-choosen"
                :class="{ 'active-tab': $route.path === '/own-tests' }"
              >
                <span class="material-icons"> account_circle </span>
              </div>
              <router-link to="/own-tests"><p>Свои тесты</p></router-link>
            </li>
          </ul>
          <div class="addition-menu">
            <p><router-link to="/languages">Сменить язык</router-link></p>
            <p @click="openPopup">Оцените нас</p>
          </div>
        </div>
      </div>
      <!-- :style тут стоит переписать навсегда в статичные св-ва! -->
      <div
        class="col s12 router-place"
        :class="{ l10: isSidebar }"
        :style="{ 'overflow-y': 'scroll' }"
      >
        <section id="section">
          <router-view />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import appNavigation from "../components/appNavigation.vue";
import appPopup from "../components/appPopup.vue";
export default {
  components: {
    appNavigation,
    appPopup,
  },
  setup() {
    const isSidebar = ref(true);
    const isDesktop = computed(() => document.body.clientWidth > 1200);
    const popup = ref(false);
    const rating = ref([
      require("../assets/empty-star.png"),
      require("../assets/empty-star.png"),
      require("../assets/empty-star.png"),
      require("../assets/empty-star.png"),
      require("../assets/empty-star.png"),
    ]);
    onMounted(() => {
      if (!isDesktop.value) {
        isSidebar.value = false;
      }
    });
    const hideSidebar_notDesktop = () => {
      if (!isDesktop.value) {
        isSidebar.value = false;
      }
    };
    const rate = (idx) => {
      for (let i = 0; i < rating.value.length; i++) {
        if (i <= idx) {
          rating.value[i] = require("../assets/yellow-star.png");
        } else {
          rating.value[i] = require("../assets/empty-star.png");
        }
      }
      console.log(rating.value);
    };
    const openPopup = () => {
      popup.value = true;
    };
    const closePopup = () => {
      popup.value = false;
    };
    const confirm = () => {
      closePopup();
    };

    return {
      isSidebar,
      popup,
      rating,
      rate,
      hideSidebar_notDesktop,
      openPopup,
      closePopup,
      confirm,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.star {
  width: 32px;
  height: 32px;
  margin: 3px;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
}
form {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.textarea {
  font-family: @main-font;
  font-size: 16px;
  font-weight: 400;
  border-radius: 10px;
  margin: 20px 0;
  padding: 10px 15px;
  height: 100px;
}
.addition-menu {
  margin-top: 100%;
  margin-left: 30px;
  & p {
    padding: 0;
    margin: 5px 0;
    color: rgb(163, 163, 163);
    &:hover {
      cursor: pointer;
    }
  }
}
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

@media only screen and (max-width: 992px) {
  .addition-menu {
    opacity: 0;
  }
  .menu-option {
    font-size: 24px !important;
  }
}
@media only screen and (max-width: 1150px) {
  .menu-option {
    font-size: 16px;
  }
}
</style>
