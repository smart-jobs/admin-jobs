import { resolve, join } from 'path'

const url_prefix = `/admin`;

const frameSrc = resolve(__dirname, '../admin-system')

module.exports = {
  // mode: 'spa',
  server: {
    port: 3000,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '智慧就业',
    // titleTemplate: '%s - 智慧就业',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: `${url_prefix}/naf-icons/iconfont.css` }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    { src: '~/style/index.less', lang: 'less' },
    { src: '~/style/common.less', lang: 'less' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui', '@/plugins/axios', '@/plugins/check-res', '@/plugins/naf-dict',
    { src: '@/plugins/stomp', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    ['@nuxtjs/proxy', { 
      pathRewrite: {
        '.*/api/system/dict': '/', '.*/api/system': '/',
        '.*/api/naf/code': '/api', '.*/api/naf': '/api',
      }
    }],
    '@nuxtjs/axios', 
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    prefix: `${url_prefix}/api`,
    port: 3000,
  },
  proxy: [
    `http://localhost:8002${url_prefix}/api/system/dict`,
    `http://localhost:8001${url_prefix}/api/system`,
    `http://localhost:8002${url_prefix}/api/naf/dict`,
    `http://localhost:8001${url_prefix}/api/naf`,
  ],
  loader: [
    {
      test: /\.less$/,
      loaders: 'style-loader!css-loader!less-loader'
    }
  ],
  /*
    ** Build configuration 
    */
  build: {
    publicPath: '/_nuxt/',
    babel: {
      "plugins": [
        ['component', {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }]
      ]
    },    
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // 设置别名
      config.resolve.alias = {
        ...(config.resolve.alias||{}),
        '@naf': join(frameSrc, '/naf'),
      }
    }
  },
  router: {
    base: `${url_prefix}/`,
    extendRoutes(routes) {

      // TODO: 重定向默认地址到'/system'
      let index = routes.findIndex(p => p.path === '/');
      if (index != -1)
        routes[index] = { path: '/', redirect: '/system' };
      else
        routes.push({ path: '/', redirect: '/system' });
    }
  },
  vue: {
    config: {
      stomp: {
        // brokerURL: 'ws://192.168.1.190:15674/ws',
        brokerURL: '/ws', // ws://${location.host}/ws
        connectHeaders: {
          host: 'smart',
          login: "web",
          passcode: "web123"
        },
        // debug: true,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
      },
      weixin: {
        // baseUrl: `http://192.168.0.7:8000${url_prefix}/weixin`,
        baseUrl: `${url_prefix}/weixin`,
      }
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ],
}
