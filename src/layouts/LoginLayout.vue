<template>
  <div class="page">
    <nav class="clear-bg">
      <div class="nav-wrapper">
        <a class="brand-logo center">DIGOSSCHOOL</a>
      </div>
    </nav>
    <div class="body">
      <div class="container">
        <div class="row">
          <div class="col m8 offset-m2 s12">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import url("../assets/css/mainStyles.less");
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.clear-bg {
  background: rgba(0, 0, 0, 0);
}
.page {
  height: 100vh;
  background-color: @main-bg-color;
  display: flex;
  flex-direction: column;
}
.body {
  flex-grow: 1;
}
.row {
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>
