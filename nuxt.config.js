import { resolve, join } from 'path';

const system_prefix = `/admin`;
const module_prefix = `/admin/jobs`;

const frameSrc = resolve(__dirname, '../admin-frame');

module.exports = {
  // mode: 'spa',
  server: {
    port: 3100,
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
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [{ rel: 'stylesheet', href: `${system_prefix}/naf-icons/iconfont.css` }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', { src: '@frame/style/index.less', lang: 'less' }, { src: '@frame/style/common.less', lang: 'less' }],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@frame/plugins/element-ui', '@frame/plugins/axios', '@frame/plugins/check-res', '@frame/plugins/naf-dict'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    [
      '@nuxtjs/proxy',
      {
        pathRewrite: {
          '.*/api/naf/code': '/api',
          '.*/api/naf': '/api',
        },
      },
    ],
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    prefix: `${system_prefix}/api`,
    port: 3000,
  },
  proxy: [`http://localhost:8002${system_prefix}/api/naf/dict`, `http://localhost:8001${system_prefix}/api/naf`],
  loader: [
    {
      test: /\.less$/,
      loaders: 'style-loader!css-loader!less-loader',
    },
  ],
  /*
   ** Build configuration
   */
  build: {
    publicPath: '/_nuxt/',
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
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
          exclude: /(node_modules)/,
        });
      }
      // 设置别名
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@naf': join(frameSrc, '/naf'),
        '@frame': frameSrc,
      };
    },
  },
  router: {
    base: `${module_prefix}/`,
    extendRoutes(routes) {
      // TODO: 重定向默认地址到'/system'
      let index = routes.findIndex(p => p.path === '/');
      if (index != -1) routes[index] = { path: '/', redirect: '/system' };
      else routes.push({ path: '/', redirect: '/system' });
    },
  },
  vue: {
    config: {},
  },
};
