<template>
  <div class="sold">
    <img class="rab" src="../assets/images/rabbit.png" alt="" />
    <div class="column1"></div>
    <div class="column2">
      <div class="right">
        <img src="../assets/images/teb.png" alt="" />
        <div class="message">SOLD OUT!!!</div>
        <div>10000/10000</div>
        <img src="../assets/images/ggg.png" alt="" />
      </div>
    </div>
    <div class="column3"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sold {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .rab {
    width: 1221px;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
}
.column1 {
  width: 100%;
  height: 142px;
  background: url("../assets/images/column1.png") no-repeat;
  background-size: 100% 100%;
}
.column2 {
  width: 100%;
  flex: 1;
  background: #ffc601;
  padding-left: 54%;
  box-sizing: border-box;
  .right {
    position: relative;
    height: 100%;
    z-index: 1;
  }
  img:first-child {
    width: 194px;
    height: 94px;
    display: block;
    margin-top: -20px;
  }
  div:nth-child(2) {
    width: 637px;
    height: 182px;
    line-height: 182px;
    text-align: center;
    background: url("../assets/images/message.png") no-repeat;
    background-size: 100% 100%;
    font-size: 104px;
    font-weight: 700;
    font-family: Impact;
    margin-left: -110px;
  }
  div:nth-child(3) {
    font-size: 128px;
    color: #fff;
    font-family: Impact;
    text-stroke: 2px #000;
    /* 兼容Webkit(Chrome/Safari)内核浏览器的写法 */
    -webkit-text-stroke: 2px #000;
    margin-top: 24px;
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
</style>