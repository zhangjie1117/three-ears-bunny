<template>
  <div class="sold">
    <img class="rab" src="../assets/images/rab.png" alt="" />
    <div class="column1">
      <img src="../assets/images/face.png" alt="" />
      <img src="../assets/images/jar.png" alt="" />
    </div>
    <div class="column2">
      <img class="teb" src="../assets/images/teb.png" alt="" />
      <div class="message">SOLD OUT !!!</div>
      <img
        @click="shareTwitter"
        class="twitter"
        src="../assets/images/twitter.png"
        alt=""
      />
      <img @click="goOpensea" class="os" src="../assets/images/os.png" alt="" />
      <img src="../assets/images/ggg.png" alt="" />
    </div>
  </div>
</template>
    
    <script>
    import { message } from "ant-design-vue";
export default {
  methods: {
    shareTwitter() {
      window.open(
        "http://twitter.com/intent/tweet?text=Three Ears Bunny SOLD OUT！！！&url=https://meeky-prod.s3.amazonaws.com/3eb-general-resource/index.html"
      );
    },
    goOpensea() {
      window.open(process.env.OPEN_URL);
    },
  },
  mounted() {
    message.success('success')
  }
};
</script>
    
    <style lang="scss" scoped>
.mobile {
  .sold {
    width: 100%;
    height: 100%;
    margin-left: 4px;
    display: flex;
    flex-direction: column;
    position: relative;
    .rab {
        width: 100vw;
        z-index: 1;
        position: absolute;
        left: -18px;
        bottom: 0;
      }
    .column1 {
      width: 100%;
      height: 57px;
      background: url("../assets/images/blue.png") no-repeat;
      background-size: 100% 100%;
      line-height: 57px;
      position: relative;
      img:first-child {
        width: 41px;
        position: absolute;
        top: 2px;
        left: 10px;
      }
      img:last-child {
        width: 81px;
        position: absolute;
        right: -5px;
        top: -10px;
        z-index: 1;
      }
    }
    .column2 {
      width: 100%;
      flex: 1;
      min-height: 580px;
      background: #ffc601;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .teb {
        position: absolute;
        left: 40px;
        top: 20px;
        width: 67px;
      }
      .message {
        font-size: 36px;
        font-family: Impact;
        color: #211200;
        line-height: 24px;
        margin-top: 75px;
      }
      .twitter {
        width: 170px;
        height: 36px;
        display: block;
        margin-top: 42px;
        z-index: 2;
      }
      .os {
        width: 106px;
        height: 36px;
        display: block;
        margin-top: 10px;
        z-index: 2;
      }
      img:last-child {
        width: 133px;
        height: 49px;
        position: absolute;
        bottom: 136px;
        right: 5px;
      }
    }
  }
}
</style>