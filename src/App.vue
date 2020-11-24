<template>
  <div id="app">
    <router-view/>
    
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      active:"/home"
    }
  }

  // components:{
  //   [Button.name]: Button
  // }
};
</script>

<style scoped lang="less">

</style>
