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
  height: 43px;
  // background-color: blue;
  display: flex;
  div:nth-child(1) {
    flex: 4;
    border-right: 1px solid #999;
    display: flex;
    justify-content: center;
    align-items: center;
    .operation_left_Comment{
      width: 80px;
      height: 20px;
      box-sizing: border-box;
      padding-top:20px;
      border:1px solid #999;
      font-size: 15px
    }
  }
  div:nth-child(2) {
    flex: 6;
    display: flex;
    div{
      flex: 1;
      border-right: 1px solid #999;
    }
  }
}
</style>