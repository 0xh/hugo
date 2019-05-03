import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user"
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  plugins:[
    createPersistedState({
      key:"eStudy",
      paths:["user"],
      subscriber(store){
        store.dispatch("user/checkedLogin")
        return function(handler){
          return store.subscribe(handler)
        }
      }
    })
  ]
})
