<template>
  <div id="app">
    
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-popup>内容</van-popup>
    <van-checkbox>复选框</van-checkbox>
    <van-switch v-model="checked" />
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'App',
  // components:{
  //   [Button.name]: Button
  // }
}
</script>

<style lang="less">

</style>
