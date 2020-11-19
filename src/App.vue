<template>
  <div id="app">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      active:0
    }
  }

  // components:{
  //   [Button.name]: Button
  // }
};
</script>

<style lang="less">
</style>
