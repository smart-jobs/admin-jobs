import Vue from 'vue'
import _ from 'lodash'

const Plugin = {

  install(Vue, options) {
    // 4. 添加实例方法
    Vue.prototype.$checkRes = function (res, okText, errText) {
      let _okText, _errText;
      if (_.isString(okText)) {
        _okText = okText;
        _errText = errText;
      } else if (_.isObject(okText) && okText !== null) {
        ({ okText: _okText, errText: _errText } = okText);
      }

      const { errcode = 0, errmsg } = res;
      if (errcode === 0) {
        if(_okText) {
          this.$notify({
            title: '成功',
            message: _okText,
            type: 'success'
          });
        }
        return true;
      } else {
        this.$notify({
          title: '错误',
          message: errmsg || _errText || '处理失败',
          type: 'error'
        });
        return false;
      }
    }
  }

}
export default () => {
  Vue.use(Plugin)
}
