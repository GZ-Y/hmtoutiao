<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import PullUp from "@better-scroll/pull-up";
BScroll.use(PullDown);
BScroll.use(PullUp);
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      defaule: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: {
        type: Object,
        defaule() {
          return {};
        }
      }
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      scrollY: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
      // pullDownRefresh: true
    });
    console.log(this.scroll);
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });

    // this.scroll.on("pullingDown", () => {
    //   this.$emit("pullingDown");
    // });
  },
  methods: {
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>
<style scoped lang="less">
</style>