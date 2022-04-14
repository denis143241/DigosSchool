<template>
  <div v-if="isOpen" @click="close" class="popup-wrapper">
    <div @click.stop class="popup">
      <slot name="popup-header" />
      <slot name="popup-content" />
      <div class="actions">
        <button
          @click="confirm"
          id="btn_success"
          class="btn waves-effect waves-light confirm"
        >
          Отправить
        </button>
        <button
          @click="close"
          id="btn-reject"
          class="btn waves-effect waves-light red darken-4 close"
        >
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    let currentPopupController = null;
    const isOpen = ref(false);
    const open = () => {
      let resolve;
      let reject;

      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });

      isOpen.value = true;
      currentPopupController = { resolve, reject };

      return popupPromise;
    };

    const confirm = () => {
      currentPopupController.resolve(true);
      isOpen.value = false;
    };

    const close = () => {
      currentPopupController.resolve(false);
      isOpen.value = false;
    };

    return { isOpen, open, close, confirm };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.popup-wrapper {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
}
.popup {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 15px;
  background-color: #fff;
  width: 500px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.confirm,
.close {
  margin: 10px;
}
@media only screen and (max-width: 600px) {
  .popup {
    width: 300px;
  }
}
</style>
