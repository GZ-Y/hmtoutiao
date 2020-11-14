<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow />
    <van-form>
      <van-field v-model="value" class="iconfont icon-shouji" placeholder="请输入手机号" />
      <van-field v-model="value" class="iconfont icon-yanzhengma" placeholder="请输入验证码" />
      <van-button class='btn_verCode' type="primary">获取验证码</van-button>
      <van-button class="btn_login" type="info" block>登录</van-button>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      active: 2
    };
  }
};
</script>
<style lang='less' scoped >
.icon-shouji{
  margin-right: 10px;
}
.btn_verCode{
  width: 110px;
  height: 30px;
  border-radius: 20px;
  top:-40px;
  left: 260px;
}
.btn_login{
  padding: 20px;
}


</style>