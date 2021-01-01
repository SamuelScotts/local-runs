import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    routeData:[
      {
        name: 'Auchterarder Chilli Trail',
        distance: '6.2 miles',
        latlng_lng: -3.706158, 
        latlng_lat: 56.297474,
      },
      {
        name: 'Dunning Den Trail',
        distance: '3.1 miles',
        latlng_lng: -3.586096, 
        latlng_lat: 56.312008,
      },
      {
        name: 'Kinpauch Trail',
        distance: '5 miles',
        latlng_lng: -3.783592,
        latlng_lat: 56.257007,
      },
    ],
    chosenPlace: '',
    locations: [
      {
        name: 'Scotland',
        lon: -452507.207448,
        lat: 7709734.866327,
        zoom: 6.5,
      },
      {
        name: 'Auchterarder',
        lon: -412479.509463,
        lat: 7617714.238901,
        zoom: 14.5,
      },
      {
        name: 'Dunning',
        lon: -399197.232179,
        lat: 7620781.274661,
        zoom: 15,
      },
      {
        name: 'Blackford',
        lon: -420929.160138,
        lat: 7610458.898132,
        zoom: 15,
      },
    ],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    selectedPlace(state, val){
      state.chosenPlace = val
    }
  },
  getters:{
    //
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
