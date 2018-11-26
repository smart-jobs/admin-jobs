/**
 * 基于WebStomp的消息处理插件
 */

import Vue from 'vue'
import _ from 'lodash'
import assert from 'assert';
import { Client } from '@stomp/stompjs/esm5/client';


const Plugin = {

  install(Vue, options) {
    assert(_.isObject(options));
    if (options.debug && !_.isFunction(options.debug)) {
      options.debug = (str) => {
        console.log(str);
      };
    }
    assert(_.isString(options.brokerURL));
    if(!options.brokerURL.startsWith('ws://')) {
      options.brokerURL = `ws://${location.host}${options.brokerURL}`;
    }

    // 3. 注入组件
    Vue.mixin({
      beforeDestroy: function () {
        if(this.$stompClient) {
          this.$stompClient.deactivate();
          delete this.$stompClient;
        }
      }
    });

    // 4. 添加实例方法
    Vue.prototype.$stomp = function (subscribes = {}) {
      // connect to mq
      const client = new Client(options);
      client.onConnect = (frame) => {
        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
        console.log('[stomp] connected');
        Object.keys(subscribes).filter(p => _.isFunction(subscribes[p])).forEach(key => {
          client.subscribe(key, subscribes[key]);
        });
      };

      client.onStompError = (frame) => {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };

      client.activate();

      this.$stompClient = client;
    }
  }
}
export default () => {
  Vue.use(Plugin, Vue.config.stomp)
}
