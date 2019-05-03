import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
//引入ant-design
import Ant from "ant-design-vue"
import Notification from "ant-design-vue/lib/notification"
import "ant-design-vue/dist/antd.css"
Vue.use(Ant)
//引入veeValidate 验证
import VeeValidate,{Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
Validator.localize('zh_CN', zh_CN);
Vue.$notification = Notification
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
