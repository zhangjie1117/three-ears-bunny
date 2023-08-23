import env from './env' // 环境配置文件
import path from 'path'
import fs from 'fs'

let remove_console= []
if(process.env.NODE_ENV === 'production'){
  remove_console.push("transform-remove-console")
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TEB',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {src: '/js/rem.js'},
      {src: '/js/twitter.js'}
    ]
  },
  env: {
    NODE_ENV: env[process.env.NODE_ENV].NODE_ENV,
    BASE_URL: env[process.env.NODE_ENV].BASE_URL,
    contract: env[process.env.NODE_ENV].contract,
    authorization: env[process.env.NODE_ENV].authorization,
    OPEN_URL: env[process.env.NODE_ENV].OPEN_URL
  },
  axios: {
    retry: false,
    baseURL: env[process.env.NODE_ENV].BASE_URL
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    '~assets/common.css'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/api.js',
    '@/plugins/web3.js',
    {src: '@/plugins/vconsole.js',ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
     
    },
    babel: {
      plugins: [
        ...remove_console 
      ] 
    },
    postcss: {
      plugins: {
        'postcss-pxtorem':{
          rootValue: 214,
          propList: ['*'],
          exclude: ['ant-design'],
          selectorBlackList:['.mobile'],
        },
        'postcss-px-to-viewport': {
          viewportWidth: 375,
          exclude: [/ant-design/],
          selectorBlackList:['.pc'],
        },  
      },
    },
    vender: ['axios']
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ca.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ca.crt'))
    }
  }
}
