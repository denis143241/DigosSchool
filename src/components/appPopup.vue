<template>
  <div v-if="isOpen" @click="close" class="popup-wrapper">
    <div @click.stop class="popup" :style="{ width: `${normalizedSize}px` }">
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
import { computed, ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";
export default {
  props: {
    windowSize: {
      type: String,
      default: "small",
    },
  },
  emits: ["down", "up", "enter"],
  setup(props, { emit }) {
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

    const normalizedSize = computed(() => {
      switch (props.windowSize) {
        case "small":
          return 500;
        case "medium":
          return 650;
        case "large":
          return 800;
      }
    });

    const confirm = () => {
      currentPopupController.resolve(true);
      isOpen.value = false;
    };

    const close = () => {
      currentPopupController.resolve(false);
      isOpen.value = false;
    };

    const handleKeydown = (e) => {
      console.log(e.key);
      switch (e.key) {
        case "Escape":
          close();
          break;

        case "ArrowDown":
          emit("down");
          break;

        case "ArrowUp":
          emit("up");
          break;

        case "Enter":
          emit("enter");
          break;
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", handleKeydown);
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeydown);
    });

    return { isOpen, normalizedSize, open, close, confirm };
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.popup-wrapper {
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
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
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.confirm,
.close {
  margin: 10px;
}
@media only screen and (max-width: 800px) {
  .popup {
    width: 100vw !important;
  }
}
</style>
