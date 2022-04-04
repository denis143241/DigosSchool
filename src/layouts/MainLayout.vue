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
        <!-- Sidebar -->
        <div class="sidebar white-text">
          <ul>
            <sidebar-tab
              :comparedPath="'/'"
              :googleIcon="'home'"
              :tabName="'Главная'"
              @chose="hideSidebar_notDesktop"
            />
            <sidebar-tab
              :comparedPath="'/category'"
              :googleIcon="'category'"
              :tabName="'Категории'"
              @chose="hideSidebar_notDesktop"
            />
            <sidebar-tab
              :comparedPath="'/resent'"
              :googleIcon="'restore'"
              :tabName="'Пройденные'"
              @chose="hideSidebar_notDesktop"
            />
            <sidebar-tab
              :comparedPath="'/create-lesson'"
              :googleIcon="'create'"
              :tabName="'Создать тест'"
              @chose="hideSidebar_notDesktop"
            />
            <sidebar-tab
              :comparedPath="'/lesson-book'"
              :googleIcon="'menu_book'"
              :tabName="'Учебник'"
              @chose="hideSidebar_notDesktop"
            />
            <sidebar-tab
              :comparedPath="'/chedule'"
              :googleIcon="'today'"
              :tabName="'Построить план'"
              @chose="hideSidebar_notDesktop"
            />
            <sidebar-tab
              :comparedPath="'/own-tests'"
              :googleIcon="'account_circle'"
              :tabName="'Свои тесты'"
              @chose="hideSidebar_notDesktop"
            />

            <sidebar-tab
              v-if="isSignIn"
              :googleIcon="'logout'"
              :tabName="'Выйти'"
              :additionClasses="{ 'hide-on-large-only': true }"
              @chose="logout_exit"
            />
            <sidebar-tab
              v-else
              :comparedPath="'/login'"
              :googleIcon="'login'"
              :tabName="'Войти'"
              :additionClasses="{ 'hide-on-large-only': true }"
              @chose="hideSidebar_notDesktop"
            />
          </ul>
          <div class="addition-menu">
            <p><router-link to="/languages">Сменить язык</router-link></p>
            <p @click="openPopup">Оцените нас</p>
          </div>
        </div>
        <!-- End Sidebar -->
      </div>
      <!-- :style тут стоит переписать навсегда в статичные св-ва! -->
      <div
        class="col s12 router-place"
        :class="{ l10: isSidebar }"
        :style="{ 'overflow-y': 'scroll' }"
      >
        <!-- Main Content -->
        <section id="section">
          <router-view />
        </section>
        <!-- End Main Content -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import appNavigation from "../components/appNavigation.vue";
import appPopup from "../components/appPopup.vue";
import sidebarTab from "../components/sidebarTab.vue";

export default {
  components: {
    appNavigation,
    appPopup,
    sidebarTab,
  },
  setup() {
    const isSidebar = ref(true);
    const isDesktop = computed(() => document.body.clientWidth > 1200);
    const popup = ref(false);
    const router = useRouter();
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
    const isSignIn = computed(() => {
      return localStorage.getItem("token") || false;
    });
    const logout_exit = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    };
    return {
      isSidebar,
      popup,
      rating,
      isSignIn,
      rate,
      hideSidebar_notDesktop,
      openPopup,
      closePopup,
      confirm,
      logout_exit,
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
ul {
  margin: 40px 20px 0 0;
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
