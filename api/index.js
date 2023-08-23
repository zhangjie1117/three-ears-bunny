export default $axios => ({
    //核对白名单信息
    checkWhiteList(address) {
        return $axios.$get(`/api/v2/public/threeearbunny/checkWhiteList?address=${address}`)
    },
    //根据功能类型获取商品列表
    getProduct(data) {
        return $axios.$get(`/api/v2/public/threeearbunny/product/${data}`)
    },
    // 校验白名单信息
    verifyWhiteList(data) {
        return $axios.$post(`/api/v2/public/threeearbunny/verifyWhiteList`,data)
    },
    //生成metamask的白名单签名
    generateSignature(type,address) {
        return $axios.$post(`/api/v2/blockchain/metamask-generate-sign/${type}`,{address})
    },
    //获取mint时间
    ping() {
        return $axios.$get(`/api/v2/public/threeearbunny/ping`)
    }
})