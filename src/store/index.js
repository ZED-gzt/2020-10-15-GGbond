import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import waiters from './waiters/index.js'
import category from './category/index'
import customer from './customer/index'
import order from './order/index'
import date from './date/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    waiters,
    category,
    customer,
    order,
  },
  getters
})

export default store
