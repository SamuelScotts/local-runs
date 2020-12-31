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
        name: 'Auchterarer Chilli Trail',
        distance: '10km',
        latlng_lng: -3.698496, 
        latlng_lat: 56.292576,
      },
      {
        name: 'Dunning Den Trail',
        distance: '5k',
        latlng_lng: -3.578053, 
        latlng_lat: 56.306923,
      },
    ],
    chosenPlace: '',
    locations: [
      {
        name: 'Auchterarder',
        lon: -412479.509463,
        lat: 7617714.238901,
        zoom: 12,
      },
      {
        name: 'Dunning',
        coorindates: []
      },
      {
        name: 'Blackford',
        coorindates: []
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
