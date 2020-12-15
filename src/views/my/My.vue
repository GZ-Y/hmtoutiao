<template>
  <div class="wrap">
    <div class="header" v-if="user">
      <personal>
        <div slot="images">
          <van-image round :src="perInfo.photo" />
        </div>
        <div slot="title_text_top">{{perInfo.name}}</div>
        <div slot="title_text_bottom">{{perInfo.intro}}</div>
        <div slot="slot_button">
          <van-button text="编辑资料" @click="editInfo" />
        </div>
      </personal>
      <van-grid class="grid_personal">
        <van-grid-item class="one-grid-item">
          <span>{{perInfo.art_count}}</span>
          <span>头条</span>
        </van-grid-item>
        <van-grid-item class="two-grid-item">
          <span>{{perInfo.follow_count}}</span>
          <span>关注</span>
        </van-grid-item>
        <van-grid-item class="three-grid-item">
          <span>{{perInfo.fans_count}}</span>
          <span>粉丝</span>
        </van-grid-item>
        <van-grid-item class="four-grid-item">
          <span>{{perInfo.like_count}}</span>
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
import { removeItem } from "@/utils/storage.js";
import { getUserInfoData } from "@/utils/user.js";

import Personal from "@/components/Personal";
export default {
  name: "My",
  data() {
    return {
      perInfo:{}
    };
  },
  components: {
    Personal
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    async getUserInfo(){
      const {data} = await getUserInfoData();
      this.perInfo = data.data
    },
    editInfo() {
      this.$router.push("/info");
    },
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
          this.$store.commit("eliminate", null);
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
    .personal {
      ::v-deep .van-image {
        width: 70px;
        height: 70px;
      }
      ::v-deep .van-button {
        width: 55px;
        height: 20px;
        color: black;
        font-size: 8px;
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