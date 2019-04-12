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
      '/platform/api/jobs': {
        // target: 'http://smart.localhost:8000',
        target: 'http://localhost:8201',
        pathRewrite: { '^/platform/api/jobs': '/admin' },
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          // proxyReq.setHeader('x-tenant', '10201');
          proxyReq.setHeader('x-tenant', '99991');
          // or log the req
        },
      },
      '/platform/api': {
        // target: 'http://smart.localhost:8000',
        target: 'http://smart.chinahuian.cn',
      },
      '/files': {
        target: 'http://smart.chinahuian.cn',
      },
      '/ddapi': {
        target: 'http://smart.chinahuian.cn',
        // pathRewrite: { '^/ddapi': '' },
      },
    },
  },
};
