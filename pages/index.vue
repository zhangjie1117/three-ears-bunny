<template>
  <div>
    <component :class="[isPC?'pc':'mobile']" :is="component"></component>
  </div>
</template>

<script>
import IndexPc from "@/components/indexPc.vue";
import indexMobile from "@/components/indexMobile.vue";
export default {
  data() {
    return {
      component: null,
      isPC: true
    };
  },
  mounted() {
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (flag) {
      //如果flag不为空，说明可以匹配到，是手机端
      this.component = indexMobile;
      this.isPC = false;
    } else {
      this.component = IndexPc;
      this.isPC = true;
    }
  },

  components: {
    IndexPc,
    indexMobile,
  },
};
</script>

<style>
*,
html,
body {
  margin: 0;
  padding: 0;
}
</style>