const path = require('path');

const frameSrc = path.resolve(__dirname, '../admin-frame');

module.exports = {
  // baseUrl: './',
  publicPath: process.env.VUE_APP_ROOT_URL + 'jobs',

  configureWebpack: {
    externals: {
      'element-ui': 'Element',
      vue: 'Vue',
    },
    resolve: {
      alias: {
        '@frame': frameSrc,
        '@naf': path.join(frameSrc, '/naf'),
        '@lib': path.join(frameSrc, '/lib'),
      },
    },
  },

  devServer: {
    port: 3002,
    before(app) {
      app.use((req, res, next) => {
        // eslint-disable-next-line no-console
        console.log(`[${req.method}]`, req.path);
        next();
      });
    },
    proxy: {
      '/platform/api': {
        target: 'http://smart.localhost:8000',
        // target: 'http://99991.smart.chinahuian.cn',
      },
      '/files': {
        target: 'http://smart.chinahuian.cn',
      },
      '/ddapi': {
        target: 'http://smart.localhost:8008',
        pathRewrite: { '^/ddapi': '' },
      },
    },
  },
};
