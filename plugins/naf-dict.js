/**
 * 字典数据处理插件
 */

import Vue from 'vue'
import _ from 'lodash'
import assert from 'assert';


const Plugin = {

  install(Vue, options) {
    // 4. 添加实例方法
    Vue.prototype.$dict = function (category, code) {
      assert(_.isString(category));
      const state = this.$store.state.naf.dict;
      if(!state) {
        throw new Error("can't find store for naf dict");
      }
      if(_.isString(code)) {
        return (state.codes[category] && state.codes[category][code]) || code;
      } else {
        return state.items[category];
      }
    }
  }
}
export default () => {
  Vue.use(Plugin)
}
