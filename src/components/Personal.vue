<template>
  <div class="personal">
    <div class="h_content">
      <van-image  round :src="require('../assets/image/tgb.jpg')" />
      <div class="title_text">
        <div class="title_text_top">
          <slot name='title_text_top'></slot>
        </div>
        <div class="title_text_bottom">
          <slot name='title_text_bottom'></slot>
        </div>
      </div>
      <div class="personal_right_btn" @click="onFollow">
        <slot name="slot_button" ></slot>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
// import { log } from 'util';

export default {
  name: "Personal",
  data() {
    return {};
  },
  // props:{
  //   autId:{
  //     type:Number,
  //     default:1
  //   }
  // },
  
  methods:{
    onFollow(){
      this.$emit('onFollow')
    }
  }
};
</script>
<style scoped lang='less'>
.personal {
  .h_content {
    position: relative;
    box-sizing: border-box;
    padding: 15px;
    display: flex;

    .title_text {
      font-size: 15px;
      color: black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
    }
    
  }
}
</style>