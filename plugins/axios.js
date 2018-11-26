import Vue from 'vue';
// import NafCore from 'naf-core';
// const { BusinessError } = NafCore.Error;

var vm = new Vue({})

export default function ({ $axios, redirect, app, store }) {
  $axios.onRequest(config => {
    if (process.browser) {
      const { isAuthenticated, unitcode, platform, access_token } = store.getters;
      // $axios.setToken(access_token); // setToken得下一次请求是才能生效，所以放弃这种方法
      config.headers['Authorization'] = access_token; // 设置config可以在本次请求生效
      // if ( isAuthenticated && platform === 'school') {
      //   config.baseURL = `/${unitcode}/api`
      // }
      vm.$loading()
    }
  })

  $axios.onResponse(response => {
    if (process.browser) {
      let load = vm.$loading();
      load.close();
      const res = response.data;
      if (res.errcode) {
        // console.log('response: ', response);
        console.error(`请求发生错误：${res.errcode}, ${res.errmsg}`);
        // vm.$message({
        //   type: 'error',
        //   message: res.errmsg || '请求失败',
        //   duration: 3000
        // });
        // vm.$notify({
        //   title: '错误',
        //   message: res.errmsg || '请求发生错误',
        //   type: 'error'
        // });
        // throw new BusinessError(res.errcode, res.errmsg);
      }
    }
  })

  $axios.onError(error => {
    if (process.browser) {
      let load = vm.$loading();
      load.close();
    }
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    } else if (code === 403) {
      redirect('/login')
    }
  })

  // $axios.defaults.headers.common['x-tenant'] = 'demo';

}
