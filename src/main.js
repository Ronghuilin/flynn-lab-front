import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import router from './router'
Vue.config.productionTip = false

Vue.use(Antd)

import moment from 'moment'
Vue.prototype.$moment=moment

import axios from 'axios'
Vue.prototype.axios=axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
