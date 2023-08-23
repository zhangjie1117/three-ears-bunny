<template>
  <div class="container1">
    <div v-if="isSoldOut == false">
      <div class="content">
        <img class="right-img" src="../assets/images/right.png" alt="" />
        <div class="column1">
          <h1>{{ mintedCount }}/{{ totalSupply }}</h1>
        </div>
        <div class="column2">
          <img class="rabbit" src="../assets/images/rabbit1.png" alt="" />
          <div class="right">
            <div v-if="!address" @click="connectCheck" class="connect">
              CONNECT
            </div>
            <div class="address-box" v-else>
              <div class="address">
                {{
                  address.substring(0, 4) +
                  "..." +
                  address.substring(address.length - 3)
                }}
              </div>
              <div class="button-1">
                <button @click="logout">LOGOUT</button>
                <button :class="isVerified ? 'disable' : ''" @click="verify">
                  VERIFY
                </button>
              </div>
            </div>
            <div v-if="address" class="note">
              <img src="../assets/images/warn.png" alt="" />
              {{
                isVerified
                  ? "Please note that you can only mint 1 transaction even if you have multiple mints,  please check for more details in official Discord."
                  : "Please verify your wallet address first!"
              }}
            </div>
            <div :class="['phase', isVerified ? '' : address ? 'disable' : '']">
              <div
                :class="[
                  'phase-item',
                  guarantee_white_list_count == 0 || isMissed ? 'disable' : '',
                  guarantee_white_list_start_time &&
                  guarantee_white_list_end_time &&
                  now >= guarantee_white_list_start_time &&
                  now <= guarantee_white_list_end_time &&
                  isVerified
                    ? 'active'
                    : '',
                ]"
              >
                <div class="title">PHASE 1</div>
                <div class="detail">
                  <div>
                    GUARANTEED MINT
                    <img
                      v-if="guarantee_white_list_count > 0 && isVerified"
                      src="../assets/images/gou.png"
                    />
                    <img
                      v-if="guarantee_white_list_count == 0 && isVerified"
                      src="../assets/images/close.png"
                      alt=""
                    />
                  </div>
                  <div>{{ formatTime(guarantee_white_list_start_time) }}</div>
                  <div v-if="isVerified && guarantee_white_list_count != 0">
                    Quantity of Mint: {{ guarantee_white_list_count }}
                  </div>
                </div>
              </div>
              <div
                :class="[
                  'phase-item',
                  non_guarantee_white_list_count == 0 ? 'disable' : '',
                  non_guarantee_white_list_start_time &&
                  non_guarantee_white_list_end_time &&
                  now >= non_guarantee_white_list_start_time &&
                  now <= non_guarantee_white_list_end_time &&
                  isVerified
                    ? 'active'
                    : '',
                ]"
              >
                <div class="title">PHASE 2</div>
                <div class="detail">
                  <div>
                    OVERALLOCATED MINT
                    <img
                      v-if="non_guarantee_white_list_count > 0 && isVerified"
                      src="../assets/images/gou.png"
                      alt=""
                    />
                    <img
                      v-if="non_guarantee_white_list_count == 0 && isVerified"
                      src="../assets/images/close.png"
                    />
                  </div>
                  <div>
                    {{ formatTime(non_guarantee_white_list_start_time) }} (FCFS)
                  </div>
                  <div v-if="isVerified && non_guarantee_white_list_count != 0">
                    Quantity of Mint: {{ non_guarantee_white_list_count }}
                  </div>
                </div>
              </div>
              <div :class="['phase-item']">
                <div class="title">PHASE 3</div>
                <div class="detail">
                  <div>
                    PUBLIC MINT
                    <img
                      v-if="isVerified"
                      src="../assets/images/gou.png"
                      alt=""
                    />
                  </div>
                  <div>{{ formatTime(public_time) }}</div>
                </div>
              </div>
              <div v-if="address && isVerified" class="phase-name">
                PHASE {{ currentPhase > 2 ? 3 : currentPhase > 1 ? 2 : 1 }}
              </div>
            </div>
          </div>
        </div>
        <div class="column3">
          <div v-if="address && isVerified" class="foot">
            <div
              class="set-width time-i"
              v-if="
                currentPhase == 1 &&
                now &&
                now <= guarantee_white_list_start_time
              "
            >
              <span>{{ day }}</span> {{ day > 1 ? "days" : "day" }}
              <span>{{ hours }}</span
              >h <span>{{ minutes }}</span
              >m <span>{{ seconds }}</span
              >s
            </div>
            <div
              class="set-width time-i"
              v-else-if="
                currentPhase == 2 &&
                now &&
                now <= non_guarantee_white_list_start_time &&
                now > guarantee_white_list_end_time
              "
            >
              <span>{{ day }}</span> {{ day > 1 ? "days" : "day" }}
              <span>{{ hours }}</span
              >h <span>{{ minutes }}</span
              >m <span>{{ seconds }}</span
              >s
            </div>
            <div class="flex operation" v-else-if="loading == 'wait'&&now!=guarantee_white_list_end_time&&now!=non_guarantee_white_list_end_time">
              <template v-if="enableMint">
                <div class="flex">
                  <img
                    @click="decrease"
                    class="jian"
                    :src="
                      count == 1
                        ? require('../assets/images/jian1.png')
                        : require('../assets/images/jian.png')
                    "
                    alt=""
                  />
                  <span style="display: flex"
                    >{{ count }}/<span class="num">
                      {{
                        currentPhase <= 1
                          ? guarantee_white_list_count
                          : currentPhase <= 2
                          ? non_guarantee_white_list_count
                          : 4
                      }}
                    </span></span
                  >
                  <img
                    @click="increase"
                    class="jia"
                    :src="
                      count < maxNum
                        ? require('../assets/images/jia.png')
                        : require('../assets/images/jia1.png')
                    "
                    alt=""
                  />
                </div>
                <div class="eth">
                  <span>ETH</span>
                  <span>{{
                    currentPhase <= 1
                      ? Math.round(guaranteeWhiteListPrice * count * 1000)/1000
                      : currentPhase <= 2
                      ? Math.round(nonGuaranteeWhiteListPrice * count * 1000)/1000
                      : Math.round(publicPrice * count * 1000)/1000
                  }}</span>
                </div>
              </template>
              <div class="mint" v-if="loading == 'wait'">
                <div v-if="enableMint" @click="mint">MINT</div>
                  <div class="time time1-i">
                  <span>{{ countDownTime[0]}}</span>:<span>{{ countDownTime[1] }}</span>:<span>{{ countDownTime[2] }}</span>
                </div>
              </div>
            </div>
            <div @click="goOpensea" v-if="loading == 'close'" class="opensea">
              <img src="../assets/images/opensea.png" alt="" />
              Mint Successful
            </div>
            <div class="opensea" v-if="loading == 'on'">
              Minting
              <div class="dots">
                <div>.</div>
                <div>.</div>
                <div>.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-if="isSoldOut == true">
      <sold-out></sold-out>
      <!-- <share></share> -->
    </div>
  </div>
</template>
  
  <script>
import soldOut from "@/components/soldOutMobile.vue";
import Share from "@/components/share.vue";
import { abi } from "../assets/json/ThreeEarsBunny.json";
import { message } from "ant-design-vue";
const contractAddress = process.env.contract;
//metamask
export default {
  components: { soldOut, Share },
  name: "IndexPage",
  data() {
    return {
      isSoldOut: null,
      address: null,
      contract: null,
      guarantee_white_list_count: null,
      non_guarantee_white_list_count: null,
      isVerified: false,
      currentPhase: 1,
      guarantee_white_list_start_time: null,
      non_guarantee_white_list_start_time: null,
      guarantee_white_list_end_time: null,
      non_guarantee_white_list_end_time: null,
      public_time: null,
      now: null,
      countDownTime: [0,0,0,0,0,0],
      guaranteeWhiteListPrice: 0,
      nonGuaranteeWhiteListPrice: 0,
      publicPrice: 0,
      count: 1,
      mintedCount: 0,
      public_count: 4, //默认不会有public的情况
      loading: "wait",
      timeId: null,
      isMissed: false,
      totalSupply: 0,
      timerId: null,
      isMinting: false,
      shijian: [],
      day: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  },
  computed: {
    maxNum() {
      if (this.currentPhase == 1) {
        return this.guarantee_white_list_count;
      } else if (this.currentPhase == 2) {
        return this.non_guarantee_white_list_count;
      }
    },
    enableMint() {
      if (this.loading == "close") {
        return false;
      }
      if (!this.isVerified) {
        return false;
      }
      if (this.currentPhase <= 1) {
        return this.guarantee_white_list_count > 0;
      } else if (this.currentPhase <= 2) {
        return this.non_guarantee_white_list_count > 0;
      }
    },
    formatTime() {
      return function (timestamp) {
        timestamp = timestamp * 1000;
        var year = new Date(timestamp).getFullYear();
        var month = new Date(timestamp).getMonth() + 1;
        var dn = new Date(timestamp).getDate();
        var hours = new Date(timestamp).getHours();
        var minutes = new Date(timestamp).getMinutes().toString().padStart(2,'0');
        var en_mon_arr = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]; //英文月份
        var d = new Array("st", "nd", "rd", "th"); //英文日期
        var AP = hours > 12 ? "PM" : "AM"; //上午/下午
        var dns;
        if (dn % 10 < 1 || dn % 10 > 3) {
          dns = d[3];
        } else {
          dns = d[(dn % 10) - 1];
          if (dn == 11 || dn == 12) {
            dns = d[3];
          }
        }
        var zone = this.getTimeZone();
        return (
          en_mon_arr[month - 1] +
          " " +
          dn +
          dns +
          " " +
          year +
          " " +
          (hours > 12 ? hours - 12 : hours) +
          ":"+
          minutes+
          AP +
          " " +
          zone
        );
      };
    },
  },
  methods: {
    goOpensea() {
      window.open(process.env.OPEN_URL);
    },
    //获取时区
    getTimeZone() {
      var now = new Date();
      const timeZoneOffsetMinutes = now.getTimezoneOffset();
      const timeZoneOffsetHours = timeZoneOffsetMinutes / 60;
      const sign = timeZoneOffsetHours > 0 ? "-" : timeZoneOffsetHours==0?'':'+';
      const formattedOffset = `UTC${sign}${Math.abs(
        timeZoneOffsetHours
      ).toString()==0?'':Math.abs(
        timeZoneOffsetHours
      ).toString()}`;
      return formattedOffset;
    },
    decrease() {
      if (this.count == 1) {
        return;
      } else {
        this.count--;
      }
    },
    increase() {
      //获取当前最大值
      var nums = document.querySelector(".num").innerText;
      console.log(nums, "num");
      if (this.count == nums) {
        return;
      } else {
        this.count++;
      }
    },
    getDifference(timestamp1, timestamp2) {
      // Calculate the difference between the two timestamps in milliseconds
      const timer = Math.abs(timestamp2 - timestamp1);
      // Convert the difference into days, hours, minutes, and seconds
      let days = parseInt(timer / 60 / 60 / 24)
        .toString()
        .padStart(2, "0"); //日
      let hours = parseInt((timer / 60 / 60) % 24)
        .toString()
        .padStart(2, "0"); //时
      let minutes = parseInt((timer / 60) % 60)
        .toString()
        .padStart(2, "0"); //分
      let seconds = parseInt(timer % 60)
        .toString()
        .padStart(2, "0"); //秒
      this.day = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    },
    countDown() {
      //now一直增加，并判断是否在guarantee_white_list_start_time和guarantee_white_list_end_time的范围内
      this.timeId = setTimeout(() => {
        this.now++;
        this.countDown();
      }, 1000);
      var now = this.now;
      if (now <= this.guarantee_white_list_end_time) {
        this.currentPhase = 1;
        var time2 = this.guarantee_white_list_end_time;
        var time1 = now;
        if(now==this.guarantee_white_list_end_time) {
          this.loading = "wait";
        }
        if(now==this.guarantee_white_list_start_time) {
          this.loading = "wait";
          this.hasMinted();
        }
      } else if (
        now > this.guarantee_white_list_end_time &&
        now <= this.non_guarantee_white_list_end_time
      ) {
        this.currentPhase = 2;
        var time2 = this.non_guarantee_white_list_end_time;
        var time1 = now;
        if (now == this.non_guarantee_white_list_end_time) {
          this.loading = "wait";
        }
        if(now==this.non_guarantee_white_list_start_time) {
          this.loading = "wait";
          this.hasMinted();
        }
      } else if (
        now > this.non_guarantee_white_list_end_time
      ) {
        this.currentPhase = 3;
        var time2 = this.public_time;
        var time1 = now;
        this.currentPhase = 3;
        this.isSoldOut = true;
        //可以清除计时器了
      }
      if (this.now && this.now < this.guarantee_white_list_start_time) {
        this.getDifference(this.now, this.guarantee_white_list_start_time);
      } else if (
        this.now &&
        this.now < this.non_guarantee_white_list_start_time &&
        this.now > this.guarantee_white_list_end_time
      ) {
        this.getDifference(this.now, this.non_guarantee_white_list_start_time);
      } else {
        const diffMilliseconds = Math.abs(time2 - time1);
        var hours = Math.floor((diffMilliseconds / 60 / 60));
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = Math.floor((diffMilliseconds / 60) % 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var seconds = Math.floor(diffMilliseconds % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var countDownTime = hours + ":" + minutes + ":" + seconds;
        this.countDownTime = countDownTime.split(":");
      }
    },
    handleNetworkChanged(networkId) {
      console.log(networkId, "networkId");
    },
    handleChainChanged(_chainId) {
      console.log("chain改变", _chainId);
      // We recommend reloading the page, unless you must do otherwise
    },
    // For now, 'eth_accounts' will continue to always return an array
    handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log("Please connect to MetaMask.");
      } else if (accounts[0] !== this.address) {
        this.address = accounts[0];
        this.loading = "wait";
        this.hasMinted();
        this.getData();
        // Do any other work!
      }
    },
    hasMinted() {
      return new Promise((resolve, reject) => {
        this.contract.methods
          .hasMinted()
          .call({ from: this.address })
          .then(async (res) => {
            console.log(res, "hasminted");
            if (this.currentPhase == 2 && !res[0]) {
              this.isMissed = true;
            }
            if (this.currentPhase == 1 && res[0]) {
              //第一阶段已经mint
              this.loading = "close";
            } else if (this.currentPhase == 2 && res[1]) {
              //第二阶段已经mint
              this.loading = "close";
            } else {
              this.loading = this.isMinting ? "on" : "wait";
            }
            resolve();
          })
          .catch((err) => {
            this.loading = this.isMinting ? "on" : "wait";
            reject();
          });
      });
    },
    getData() {
      this.$api.index
        .checkWhiteList(this.address)
        .then((res) => {
          if (res.result == 1) {
            this.guarantee_white_list_count =
              res.data.guarantee_white_list_count;
            this.non_guarantee_white_list_count =
              res.data.non_guarantee_white_list_count;
            this.isVerified = res.data.verified;
            if (this.currentPhase <= 1) {
              this.count = this.guarantee_white_list_count;
            } else if (this.currentPhase <= 2) {
              this.count = this.non_guarantee_white_list_count;
            }
          }
        })
        .catch((err) => {
          message.error(err);
        });
    },
    async generateSignature(type, address) {
      var res = await this.$api.index.generateSignature(type, address);
      if (res.result == 1) {
        return res.data;
      } else {
        console.log("报错了111");
      }
    },
    async mint() {
      var func, amount, quantity, maxcount;
      //正在minting
      this.isMinting = true;
      this.loading = "on";
      //处理在移动端mint成功之后，又在pc端点击mint的情况
      await this.hasMinted();
      console.log("执行到这儿了");
      if (this.loading == "close") {
        this.isMinting = false;
        return;
      } else {
        if (this.currentPhase == 1) {
          func = "mintForGuaranteeWhiteList";
          amount = this.guaranteeWhiteListPrice * 10 ** 18;
          quantity = this.count;
          maxcount = this.guarantee_white_list_count;
          //获取签名
          var { nonce, sign } = await this.generateSignature(1, this.address);
        } else if (this.currentPhase == 2) {
          func = "mintForNonGuaranteeWhiteList";
          amount = this.nonGuaranteeWhiteListPrice * 10 ** 18;
          quantity = this.count;
          maxcount = this.non_guarantee_white_list_count;
          var { nonce, sign } = await this.generateSignature(2, this.address);
        } else if (this.currentPhase == 3) {
          //不会有这种情况
          func = "mintForPublic";
          amount = this.publicPrice * 10 ** 18;
          quantity = this.count;
          maxcount = this.public_count;
          var { nonce, sign } = await this.generateSignature(0, this.address);
        }
        this.contract.methods[`${func}`](
          quantity,
          maxcount,
          nonce.toString(),
          sign
        )
          .send({
            from: this.address,
            value: (this.count * amount).toString(),
          })
          .then((res) => {
            console.log("mint成功了");
            this.loading = "close";
            this.isMinting = false;
            // window.postMessage({ minted: true, address: this.address });
          })
          .catch((err) => {
            console.log(err, "mint报错了");
            this.isMinting = false;
            this.loading = "wait";
          });
      }
    },
    logout() {
      this.address = null;
      this.loading = "wait";
      this.guarantee_white_list_count = null;
      this.non_guarantee_white_list_count = null;
      this.count = 1;
      this.isMissed = false;
      this.isVerified = false;
    },
    connectMetamask() {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            console.log(res, "accounts");
            this.address = res[0];
            this.hasMinted();
            this.getData();
          })
          .catch((error) => {
            if (error.code === 4001) {
              // EIP-1193 userRejectedRequest error
              console.log("Please connect to MetaMask.");
            } else {
              console.error(error);
            }
          });
      }else {
        console.error('Please install MetaMask!');
      }
    },
    connectCheck() {
      this.connect([this.connectMetamask]);
    },
    connect(cb) {
        //检测当前网络
        this.$web3.eth.net.getId().then(async (id) => {
          console.log(id, "id");
          if (
            (process.env.NODE_ENV == "development" && id == 80001) ||
            (process.env.NODE_ENV == "production" && id == 1)
          ) {
            for (var i = 0; i < cb.length; i++) {
              await cb[i]();
            }
          } else {
            try {
              await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [
                  {
                    chainId:
                      process.env.NODE_ENV == "development" ? "0x13881" : "0x1",
                  },
                ],
              });
              for (var i = 0; i < cb.length; i++) {
                await cb[i]();
              }
            } catch (switchError) {
              // This error code indicates that the chain has not been added to MetaMask.
              if (switchError.code === 4902) {
                try {
                  await ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: "0x13881",
                        chainName: "Mumbai",
                        rpcUrls: [
                          "https://rpc-mumbai.maticvigil.com",
                        ] /* ... */,
                      },
                    ],
                  });
                  this.connect();
                } catch (addError) {
                  // handle "add" error
                }
                // handle other "switch" errors
              }
            }
          }
        });
      // else {
      //   this.$web3.currentProvider.enable().then((res) => {
      //     this.address = res[0];
      //     for (var i = 0; i < cb.length; i++) {
      //       cb[i]();
      //     }
      //     this.getData();
      //   });
      //   console.error("Please connect to MetaMask.");
      // }
    },
    verify() {
      if (this.isVerified) {
        return;
      }
      if (this.address) {
        this.$api.index
          .verifyWhiteList({ address: this.address })
          .then((res) => {
            if (res.result == 1) {
              //验证成功
              message.success("success");
              this.isVerified = true;
            } else {
              message.error("error");
              this.isVerified = false;
            }
          })
          .catch((err) => {
            message.error(err);
          });
      } else {
        message.warn("Please connect to MetaMask.");
      }
    },
    getConfig() {
      this.contract.methods
        .getConfig()
        .call()
        .then((res) => {
          console.log(res, "config");
          this.guaranteeWhiteListPrice = res[0] / Math.pow(10, 18);
          this.nonGuaranteeWhiteListPrice = res[1] / Math.pow(10, 18);
          this.publicPrice = res[2] / Math.pow(10, 18);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    getMintedCount() {
      this.timerId = setInterval(() => {
        this.contract.methods
          .totalMintedCount()
          .call()
          .then((res) => {
            this.mintedCount = res;
            if (res == this.totalSupply) {
              //卖完了
              this.isSoldOut = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 3000);
    },
    ping() {
      this.$api.index
        .ping()
        .then((res) => {
          if (res.result == 1) {
            var data = res.data;
            var keys = Object.keys(data);
            // 19472,214511,187899,7384,37180,512058
            this.guarantee_white_list_start_time = data[keys[0]] ^ 19472;
            this.guarantee_white_list_end_time = data[keys[1]] ^ 214511;
            this.non_guarantee_white_list_start_time = data[keys[2]] ^ 187899;
            this.non_guarantee_white_list_end_time = data[keys[3]] ^ 7384;
            this.public_time = data[keys[4]] ^ 37180;
            this.now = data[keys[5]] ^ 512058;
            this.countDown();
          }
        })
        .catch((err) => {
          message.error(err);
        });
    },
    checkViChange() {
      clearTimeout(this.timeId);
      if (!document.hidden) {
        console.log("显示");
        this.ping();
      }
    }
  },
  destroyed() {
    window.removeEventListener("visibilitychange",this.checkViChange);
  },
  async mounted() {
    document.addEventListener("visibilitychange", this.checkViChange);
    this.ping();
    if(ethereum.isConnected()) {
      ethereum.request({
        method: 'eth_accounts'
      }).then(res=> {
       this.address = res[0];
       this.getData();
      })
    }
    if (this.$web3) {
      this.contract = new this.$web3.eth.Contract(abi, contractAddress);
      var func = () => {
        this.contract.methods
          .MAX_TOTAL_SUPPLY()
          .call()
          .then((res) => {
            this.totalSupply = res;
            this.contract.methods
              .totalMintedCount()
              .call()
              .then((res) => {
                this.mintedCount = res;
                if (res == this.totalSupply) {
                  //卖完了
                  this.isSoldOut = true;
                } else {
                  this.isSoldOut = false;
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
      };
      //调connect方法去判断当时的链是否正确，如果正确的话才可以调取
      this.connect([this.getConfig, func,this.hasMinted]);
      this.getMintedCount();
    } else {
      this.isSoldOut = false;
    }
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", this.handleAccountsChanged);
      // Do something with the chainId
      window.ethereum.on("chainChanged", this.handleChainChanged);
    }
  },
};
</script>
  <style lang="scss" scoped>
  @keyframes loadingDot1 {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  5% {
    opacity: 1;
    transform: translateX(0px);
  }
  70% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes loadingDot2 {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  10% {
    opacity: 0;
    transform: translateX(-10px);
  }
  15% {
    opacity: 1;
    transform: translateX(0px);
  }
  70% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes loadingDot3 {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  20% {
    opacity: 0;
    transform: translateX(-10px);
  }
  25% {
    opacity: 1;
    transform: translateX(0px);
  }
  70% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.mobile.container1 {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/images/bg3.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 13px;
  box-sizing: border-box;
  position: relative;
  display: grid;
  .time-i {
  span {
    display: inline-block;
    width: 30px;
  }
}
.time1-i {
  span {
    display: inline-block;
    width: 15px;
  }
}
  .flex {
    display: flex;
    align-items: center;
  }
  .ml-95 {
    margin-left: 95px !important;
  }
  .set-width {
    // min-width: 180px;
  }
  .content {
    width: 346px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    position: relative;
    .column1 {
      width: 100%;
      height: 57px;
      background: url("../assets/images/blue.png") no-repeat;
      background-size: 100% 100%;
      h1 {
        font-size: 33px;
        width: 100%;
        height: 57px;
        line-height: 57px;
        font-family: Impact;
        color: #fffefe;
        text-align: center;
      }
    }
    .column2 {
      width: 100%;
      flex: 1;
      min-height: 600px;
      background: #ffc601;
      position: relative;
      .right {
        padding-top: 10px;
        height: 100%;
        box-sizing: border-box;
        .connect {
          width: 161px;
          height: 36px;
          background: #ff294b;
          border-radius: 18px;
          opacity: 1;
          font-size: 24px;
          font-family: Impact;
          color: #ffffff;
          line-height: 36px;
          margin: 0 auto;
          text-align: center;
          cursor: pointer;
        }
        .phase {
          // position: absolute;
          margin-top: 15px;
          margin-left: 11px;
          &.disable {
            .phase-item {
              background: #ffda59;
              div {
                color: #ebb400 !important;
              }
            }
          }
          .phase-item {
            width: 342px;
            min-height: 121px;
            background: #ffda59;
            border-radius: 10px;
            padding-left: 15px;
            margin-bottom: 6px;
            padding-top: 13px;
            position: relative;
            box-sizing: border-box;
            &.disable {
              background: #ffda59;
              div:not(:nth-child(3)) {
                color: #ebb400 !important;
              }
            }
            &.active {
              background: #fff;
              div {
                &:not(.title) {
                  color: #211200 !important;
                }
                &:nth-child(3) {
                  color: #0b73ff !important;
                }
                &.title {
                  color: #0b73ff !important;
                }
              }
              &.disable {
                div:not(:nth-child(3)) {
                  color: #ebb400 !important;
                }
              }
            }
            &::after {
              display: block;
              content: "";
              width: 5px;
              height: 5px;
              position: absolute;
              top: 10px;
              right: 10px;
              background: #f2a00f;
              border-radius: 50%;
            }
            .title {
              font-size: 37px;
              font-family: Impact;
              color: #0b73ff;
              line-height: 1;
            }
            .detail {
              div:first-child {
                line-height: 1;
                font-size: 30px;
                font-family: Impact;
                color: #211200;
                display: flex;
                align-items: center;
                img {
                  height: 24px;
                  margin-left: 6px;
                }
              }
              div:nth-child(2) {
                line-height: 1;
                font-size: 12px;
                font-family: ErasITC-Bold;
                font-weight: bold;
                color: #000000;
              }
              div:nth-child(3) {
                line-height: 1;
                font-size: 20px;
                font-family: Impact;
                color: #0b73ff;
              }
            }
          }
          .phase-name {
            font-size: 27px;
            font-family: Impact;
            color: #0b74ff;
            position: absolute;
            bottom: 0;
          }
        }
        .address-box {
          display: flex;
          height: 31px;
          align-items: center;
          margin-left: 11px;
        }
        .address {
          width: 250px;
          height: 31px;
          background: #ffffff;
          border-radius: 15px 15px 15px 15px;
          opacity: 1;
          font-size: 19px;
          font-family: Impact;
          color: #0b73ff;
          line-height: 31px;
          text-align: center;
        }
        .button-1 {
          height: 100%;
          button {
            display: block;
            border: none;
            width: 70px;
            height: 31px;
            background: #ff294b;
            border-radius: 14px;
            opacity: 1;
            font-size: 18px;
            font-family: Impact;
            color: #ffffff;
            line-height: 31px;
            margin-bottom: 6px;
            margin-left: 2px;
            position: relative;
            z-index: 2;
            &.disable {
              background: #ff294b;
              color: #ff7187;
            }
          }
        }
        .note {
          width: 250px;
          background: #ffe179;
          border-radius: 15px;
          opacity: 1;
          position: relative;
          padding-left: 33px;
          padding-top: 8px;
          padding-bottom: 6px;
          font-size: 12px;
          margin-top: 5px;
          margin-left: 11px;
          font-family: ErasITC-Bold, ErasITC;
          font-weight: bold;
          color: #211200;
          line-height: 1;
          letter-spacing: -0.04em;
          box-sizing: border-box;
          min-height: 31px;
          display: flex;
          align-items: center;
          img {
            width: 26px;
            height: 26px;
            position: absolute;
            left: 3px;
            top: 2px;
          }
        }
      }
    }
    .column3 {
      width: 100%;
      height: 57px;
      background: url("../assets/images/column1.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      z-index: 1;
      .foot {
        position: absolute;
        width: 100%;
        height: 57px;
        box-sizing: border-box;
        left: 0;
        bottom: 0px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 27px;
        font-family: Impact;
        color: #ffffff;
        .opensea {
          position: relative;
          .dots {
            display: flex;
            justify-content: center;
            height: 6px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            overflow: hidden;
            div {
              width: 6px;
              height: 100%;
              background: #fff;
              margin-right: 5px;
              &:first-child {
                animation: loadingDot1 2s ease-in-out infinite;
              }
              &:nth-child(2) {
                animation: loadingDot2 2s ease-in-out infinite;
              }
              &:last-child {
                margin-right: 0;
                animation: loadingDot3 2s ease-in-out infinite;
              }
            }
          }
        }
        .opensea img {
          position: absolute;
          width: 158px;
          height: 34px;
          right: 0px;
          top: -25px;
          z-index: 2;
        }
        .operation {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-family: Impact;
          color: #ffc913;
          height: 100%;
          img {
            width: 24px;
            height: 24px;
            &.jian {
              margin-left: 10px;
              margin-right: 9px;
            }
            &.jia {
              margin-left: 9px;
              margin-right: 7px;
            }
          }
        }
        .eth {
          width: 124px;
          background: #fff;
          border-radius: 15px;
          display: flex;
          padding: 0 10px;
          box-sizing: border-box;
          justify-content: space-between;
          font-size: 20px;
          font-family: Impact;
          color: #0b74ff;
        }
        .mint {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 100%;
          div:not(.time) {
            width: 80px;
            height: 27px;
            margin-top: 12px;
            background: #ff294b;
            border-radius: 6px;
            opacity: 1;
            font-size: 20px;
            font-family: Impact;
            color: #ffffff;
            line-height: 27px;
            text-align: center;
            cursor: pointer;
          }
        }
        .time {
          font-size: 12px;
          line-height: 12px;
          font-family: Impact;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
  .rabbit {
    position: absolute;
    bottom: -15px;
    right: -14px;
    width: 180px;
    z-index: 1;
  }
  .right-img {
    width: 64px;
    height: 74px;
    position: absolute;
    top: -10px;
    right: -8px;
    z-index: 1;
  }
}
</style>
  