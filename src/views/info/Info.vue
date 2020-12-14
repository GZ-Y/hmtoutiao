<template>
  <div class="info">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link/>
      <van-cell title="昵称" is-link @click="show = true"/>
        <van-popup v-model="show" position="top" :style="{ height: '100%' }" get-container="body" >
          <van-nav-bar
            title="修改昵称"
            left-text="取消"
            right-text="确定"
            left-arrow
          />
        </van-popup>
      </van-cell>
      </van-cell>
      <van-cell title="姓别" is-link/>
      <van-cell title="生日" is-link/>
    </van-cell-group>
    
  </div>
</template>

<script>
  export default {
    name:'Info',
    data() {
      return {
        show:false
      }
    },
    methods:{
      getContainer() {
        return document.querySelector('body');
    },
    }
  }
</script>
<style scoped>

</style>