<template>
  <div class="alert" :class="{ success: success, wrong: !success }">
    <p>{{ message }}</p>
    <span @click="$emit('close')" class="material-icons top-right">
      close
    </span>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
  props: {
    success: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
      default: 5000,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    onMounted(() => {
      setTimeout(() => {
        emit("close");
      }, props.duration);
    });
  },
};
</script>

<style lang="less" scoped>
.alert {
  position: relative;
  width: 100%;
  border-radius: 10px;
  min-height: 80px;
  margin: 20px 0;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  transition: 0.1s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
}
.success {
  background-color: #d5f5e3;
  border: 2px solid #00cc66;
}
.wrong {
  background-color: #fdedec;
  border: 2px solid #cb4335;
}
</style>
