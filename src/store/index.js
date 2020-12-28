import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    routes: [
        {
          name: 'Dunning Den',
          distance: '5km',
          type: 'Trail',
          startCoord1: -3.585312000,
          startCoord2:  56.311843000,
        },
    ],
    locations: [
      {
        name: 'Auchterarder',
        coorindates: [-412587.969426, 7616993.685547]
      },
      {
        name: 'Dunning',
        coorindates: [-399345.254276, 7620746.340550]
      },
      {
        name: 'Blackford',
        coorindates: [-421034.261052, 7610325.151994]
      },
    ],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
  
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },

    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()
  
      // set user profile in state
      commit('setUserProfile', userProfile.data())
      
      // change route to dashboard
      router.push('/dashboard')
    },

    async logout({ commit }) {
      await fb.auth.signOut()
    
      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/')
    }
  },
  modules: {
  }
})
