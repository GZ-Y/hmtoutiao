<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  beforeCreate() {
    if (!window.performance.navigation.type == 1) {
      alert("欢迎来到头条号");
    } 
  }
};
</script>

<style scoped lang="less">
</style>
