<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow />
    <van-form @submit='onAdopt' @failed='onFail' validate-trigger="onSubmit" ref="formRef">
      <van-field v-model="user.mobile" class="iconfont icon-shouji" placeholder="请输入手机号" name="mobile" :rules="formRules.mobile" show-error="false" show-error-message="false" type='number' />
      <van-field v-model="user.code" class="iconfont icon-yanzhengma" placeholder="请输入验证码" name="code" :rules="formRules.code" type='number' />
      <van-button @click="getCaptcha" class='btn_verCode' type="primary">获取验证码</van-button>
      <van-button @click="onLogin" class="btn_login" type="info" block>登录</van-button>
    </van-form>
  </div>
</template>

<script>
import { getCaptchaData, getLoginData } from "../../utils/login.js";
// import { validate } from "json-schema";
// import { log } from "util";
export default {
  name: "Home",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810"
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: () => {
              this.$toast("手机号不能为空");
            }
          },
          {
            pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
            message: () => {
              this.$toast({
                message: "请输入正确的手机号",
                position: "top"
              });
            }
          }
        ]
      },
      code: [
        {
          required: true,
          message: () => {
            this.$toast("请输入验证码");
          }
        },
        {
          pattern: /^\d{6}$/,
          message: () => {
            this.$toast("验证码格式错误");
          }
        }
      ]
    };
  },
  created() {},
  methods: {
    onAdopt() {
      this.$notify({
        type: "success",
        message: "登陆成功"
      });
    },
    onFail() {},
    async getCaptcha() {
      //这个给form元素绑定，然后给input表单的name进行验证，返回的是一个undefined
      await this.$refs.formRef.validate("mobile");
      const captch = await getCaptchaData(this.user.mobile);
    },
    async onLogin() {
      try {
        const data = await getLoginData(this.user);
        this.$notify({
          type: "success",
          message: "登陆成功"
        });
      } catch (err) {
        this.$notify({
          type: "danger",
          message: "登陆失败"
        });
      }
    }
  }
};
</script>
<style lang='less' scoped >
.icon-shouji {
  margin-right: 10px;
}
.btn_verCode {
  width: 110px;
  height: 30px;
  border-radius: 20px;
  top: -40px;
  left: 260px;
}
.btn_login {
  padding: 20px;
}
</style>