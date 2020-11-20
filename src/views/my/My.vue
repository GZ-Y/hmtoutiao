<template>
  <div class="wrap">
    <div class="header" v-if="user">
      <div class="h_content">
        <van-image width="70" height="70" round :src="require('../../assets/image/tgb.jpg')" />
        <span class="left_text">淘股吧</span>
        <van-button type="default">编辑资料</van-button>
      </div>
      <van-grid class="grid_personal">
        <van-grid-item class="one-grid-item">
          <span>0</span>
          <span>头条</span>
        </van-grid-item>
        <van-grid-item class="two-grid-item">
          <span>1</span>
          <span>关注</span>
        </van-grid-item>
        <van-grid-item class="three-grid-item">
          <span>2</span>
          <span>粉丝</span>
        </van-grid-item>
        <van-grid-item class="four-grid-item">
          <span>3</span>
          <span>获赞</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="header_not_login" v-else>
      <div class="containe">
        <van-image width="70" height="70" round src="" />
        <span @click="jumpLogin">未登录/注册</span>
      </div>
    </div>
    <van-grid class="grid_coll_his" clickable :column-num="2">
      <van-grid-item icon-prefix="hmtoutiao" icon="shoucang" text="收藏" to="/" />
      <van-grid-item icon-prefix="hmtoutiao" icon="lishi" text="历史" url="" />
    </van-grid>
    <van-cell class='cell_first' title="消息通知" is-link size="large" />
    <van-cell class='cell_two' title="小智同学" is-link size="large" />
    <van-cell @click="onLogOut" v-if="user" class='cell_last' title="退出登录" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "My",
  data() {
    return {};
  },
  created() {
    // console.log(this.user);
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    jumpLogin() {
      this.$toast.loading({
        message: "正在跳转...",
        forbidClick: true,
        duration: 1500,
        onClose: () => {
          this.$router.push("/login");
        }
      });
    },
    onLogOut() {
      this.$dialog
        .confirm({
          title: "退出",
          message: "您确定要退出登录吗？"
        })
        .then(() => {
          // on confirm
          this.$store.commit("eliminate");
        })
        .catch(() => {
          // on cancel
          return;
        });
    }
  }
};
</script>
<style scoped lang="less">
@color_b: #439ffa;
@color_g: #f5f7f9;
.wrap {
  .header {
    background-color: @color_b;
    .h_content {
      position: relative;
      box-sizing: border-box;
      padding: 15px;
      ::v-deep .van-image {
        vertical-align: middle;
      }
      .left_text {
        font-size: 20px;
        color: white;
        margin-left: 20px;
      }
      ::v-deep .van-button {
        width: 60px;
        height: 17px;
        font-size: 5px;
        border-radius: 30px;
        padding: 0;
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
      }
    }
    ::v-deep .van-grid {
      span {
        font-size: 17px;
      }
    }
    .grid_personal {
      ::v-deep .van-grid-item__content {
        background-color: @color_b;
      }
    }
  }
  .header_not_login {
    height: 180px;
    background-color: @color_b;
    .containe {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .grid_coll_his {
    ::v-deep .van-grid-item:nth-child(1) {
      color: red;
    }
    ::v-deep .van-grid-item:nth-child(2) {
      color: orange;
    }
  }

  .cell_first {
    border-top: 4px solid @color_g;
  }

  .cell_two {
    border-bottom: 4px solid @color_g;
  }
  .cell_last {
    text-align: center;
    border-bottom: 1px solid @color_g;
    color: red;
  }
}
</style>