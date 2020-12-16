import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Popup } from 'vant';
import '@/utils/dayjs'

Vue.prototype.$bus = new Vue()
Vue.use(Popup);
import './plugins/vant'
import 'amfe-flexible'
import './styles/icon.css'
import './styles/markdown-body.css'
import './styles/index.less'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
