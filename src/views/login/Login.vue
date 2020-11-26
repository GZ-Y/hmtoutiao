<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow @click-left="onNextLevel" />
    <van-form @submit='onLogin' validate-trigger="onSubmit"  ref="formRef">
      <van-field v-model="user.mobile" class="hmtoutiao hmtoutiao-shouji" placeholder="请输入手机号" name="mobile" :rules="formRules.mobile" show-error="false" show-error-message="false" type='number' />
      <van-field v-model="user.code" class="hmtoutiao hmtoutiao-yanzhengma" placeholder="请输入验证码" name="code" :rules="formRules.code" type='number' />
      <van-button :disabled="disabled" ref="vanBtn" @click="getCaptcha" class='btn_verCode' type="primary" native-type="button">
        <span v-if="isTime !== true">获取验证码</span>
        <van-count-down @finish="changeSpan" v-else :time="time" format="ss s" />
      </van-button>
      <van-button class="btn_login" type="info" block>登录</van-button>
    </van-form>
  </div>
</template>

<script>
import { getCaptchaData, getLoginData } from "../../utils/login.js";
// import { log } from 'util';

export default {
  name: "Login",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810"
      },
      time: 60 * 1000,
      isTime: false,
      disabled: false,
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
        ],
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
      }
    };
  },
  created() {
    
  },
  mounted(){

  },
  methods: {
    //左侧箭头点击事件
    onNextLevel(){
      this.$router.go(-1)
    },
    //倒计时完成时触发事件
    changeSpan() {
      this.isTime = !this.isTime;
      this.disabled = false;
      this.$refs.vanBtn.style.backgroundColor = "#07c160";
    },
    //发送验证码按钮
    async getCaptcha() {
      //这个给form元素绑定，然后给input表单的name进行验证，返回的是一个undefined
      // const mobile = await this.$refs.formRef.validate("mobile");
      // console.log(mobile === undefined);
      try {
        await this.$refs.formRef.validate("mobile");
        const captch = await getCaptchaData(this.user.mobile);
        this.$toast({
          type: "success",
          message: "验证码已成功发送！"
        });
        this.isTime = !this.isTime;
        if (this.isTime) {
          console.log(this.$refs.vanBtn.className);
          this.$refs.vanBtn.style.backgroundColor = "#fff";
          this.disabled = true;
        }
      } catch (err) {
        // console.log("报错信息", err);
        if (err.request.status === 429) {
          this.$toast({
            type: "fail",
            message: "验证码操作过于频繁，请稍后再试！"
          });
        }
      }
    },
    //表单验证成功时提交事件
    async onLogin() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true
      });
      try {
        const {data} = await getLoginData(this.user);
        this.$toast({
          type: "success",
          message: "登陆成功"
        });
        window.localStorage.setItem('user',JSON.stringify(data.data));
        this.$store.commit('increment');
        this.$router.push('/my');
      } catch (err) {
        if (err.request.status === 400) {
          this.$toast({
            type: "fail",
            message: "验证码错误，请重新输入！"
          });
        }
      }
    }
  }
};
</script>
<style lang='less' scoped >
.btn_verCode {
  width: 110px;
  height: 30px;
  border-radius: 20px;
  top: -40px;
  left: 260px;
}

::v-deep .van-button--info {
  width: 80%;
  margin: 0 auto;
}

.vanBtn {
  background-color: #999;
  border: none;
}
</style>