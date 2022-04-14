<template>
  <div @click="$emit('closePopup')" class="popup-wrapper">
    <div @click.stop class="popup">
      <slot name="popup-header" />
      <slot name="popup-content" />
      <div class="actions">
        <button
          @click="$emit('confirm')"
          class="btn waves-effect waves-light confirm"
        >
          Отправить
        </button>
        <button
          @click="$emit('closePopup')"
          class="btn waves-effect waves-light red darken-4 close"
        >
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
  emits: ["closePopup", "confirm"],
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
