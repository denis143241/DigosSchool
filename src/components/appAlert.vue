<template>
  <div class="alert" :class="{ success: success, wrong: !success }">
    <p>{{ message }}</p>
  </div>
</template>

<script>
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
  },
};
</script>

<style lang="less" scoped>
.alert {
  width: 100%;
  border-radius: 10px;
  min-height: 80px;
  margin: 20px 0;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
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
