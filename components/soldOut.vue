<template>
  <div class="sold">
    <img class="rab" src="../assets/images/rabbit.png" alt="" />
    <div class="column1">10000/10000</div>
    <div class="column2">
      <div class="right">
        <div class="message">SOLD OUT !!!</div>
        <img
          @click="shareTwitter"
          class="twitter"
          src="../assets/images/twitter.png"
          alt=""
        />
        <img
          @click="goOpensea"
          class="os"
          src="../assets/images/os.png"
          alt=""
        />
        <img src="../assets/images/ggg.png" alt="" />
      </div>
    </div>
    <div class="column3"></div>
  </div>
</template>
  
  <script>
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
};
</script>
  
  <style lang="scss" scoped>
.pc .sold {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .rab {
    width: 1221px;
    height: 105%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  .column1 {
    width: 100%;
    height: 142px;
    background: url("../assets/images/column1.png") no-repeat;
    background-size: 100% 100%;
    font-size: 123px;
    line-height: 142px;
    font-family: Impact;
    color: #fffefe;
    padding-left: 950px;
    box-sizing: border-box;
  }
  .column2 {
    width: 100%;
    flex: 1;
    background: #ffc601;
    padding-left: 820px;
    box-sizing: border-box;
    .right {
      position: relative;
      height: 100%;
      z-index: 1;
      overflow: hidden;
    }
    .message {
      width: 637px;
      height: 182px;
      line-height: 182px;
      padding-left: 100px;
      background: url("../assets/images/message.png") no-repeat;
      background-size: 100% 100%;
      font-size: 104px;
      font-weight: 700;
      font-family: Impact;
      margin-top: 50px;
      color: #211200;
      box-sizing: border-box;
    }
    .twitter {
      width: 490px;
      height: 103px;
      display: block;
      margin-top: 15px;
      margin-left: 45px;
    }
    .os {
      width: 304px;
      height: 103px;
      display: block;
      margin-top: 10px;
      margin-left: 45px;
    }
    img:last-child {
      width: 359px;
      height: 133px;
      position: absolute;
      bottom: 10px;
      right: 50px;
    }
  }
  .column3 {
    width: 100%;
    height: 142px;
    background: url("../assets/images/column1.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>