import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import main from './main'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import state from './state'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  return createStore({
    modules: {
      // main
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,

    // Main store
    getters,
    mutations,
    actions,
    state,
  })
})
