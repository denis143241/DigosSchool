<template>
  <li @click="$emit('chose')" class="menu-option" :class="additionClasses">
    <div
      class="visible-if-choosen"
      :class="{ 'menu-option_active': $route.path === comparedPath }"
    >
      <span class="material-icons"> {{ googleIcon }} </span>
    </div>
    <router-link :to="comparedPath"
      ><p>{{ tabName }}</p></router-link
    >
  </li>
</template>

<script>
export default {
  props: {
    comparedPath: {
      type: String,
      default: "#",
    },
    googleIcon: {
      type: String,
    },
    tabName: {
      type: String,
    },
    additionClasses: {
      type: Object,
    },
  },
  emits: ["chose"],
};
</script>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.menu-option {
  display: flex;
  align-items: center;
  font-size: 24px;
  & a {
    color: @nav-color;
  }
  &_active {
    background-color: @choosen-menu-options-color;
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
li {
  margin: 20px 0;
  &:hover {
    background-color: @choosen-menu-options-color;
    border-radius: 0 30px 30px 0;
  }
}
p {
  margin: 0 0 0 10px;
  padding: 0;
  line-height: 24px;
}
</style>
