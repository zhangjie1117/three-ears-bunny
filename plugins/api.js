import indexModule from '~/api/index'

export default function ({ $axios }, inject) {
    const apiModules = {}
    $axios.onRequest(config=> {
        // config.headers.Authorization = process.env.authorization
    })
    $axios.onResponse(res=> {
        return Promise.resolve(res)
    })
    $axios.onError(err=> {
        console.log(err,'err')
        return Promise.reject(err)
    })
    apiModules.index = indexModule($axios)
    inject('api', apiModules)
}
