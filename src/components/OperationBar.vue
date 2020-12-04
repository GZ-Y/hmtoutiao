<template>
  <div class="operation-bar">
    <div class="operation-bar_wrap">
      <div class="operation_left">
        <div class="operation_left_Comment">写评论</div>
      </div>
      <div class="operation_right">
        <div class="like">
          <van-icon name="good-job-o"></van-icon>
        </div>
        <div class="news">
          <van-icon name="other-pay"></van-icon>
        </div>
        <div class="collection">
          <van-icon name="star-o"></van-icon>
        </div>
        <div class="share">
          <van-icon name="share-o"></van-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OperationBar",
  data() {
    return {};
  }
};
</script>
<style scoped lang='less'>
.operation-bar_wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 43px;
  background-color: white;
  border-top: 1px solid #eee;
  display: flex;
  div:nth-child(1) {
    flex: 4;
    .operation_left_Comment {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      width: 60%;
      height: 20px;
      margin: 0 auto;
      padding: 0 10px;
      border: 1px solid #999;
      font-size: 15px;
      text-align: center;
    }
  }
  div:nth-child(2) {
    flex: 6;
    display: flex;
    div {
      flex: 1;
      /deep/ .van-icon {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      /deep/ .van-icon-other-pay {
        height: 24px;
      }
    }
  }
}
</style>