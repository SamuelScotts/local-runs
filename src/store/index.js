import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    routeData:[],
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
        zoom: 14,
      },
      {
        name: 'Blackford',
        lon: -420929.160138,
        lat: 7610458.898132,
        zoom: 14,
      },
    ],
  },
  mutations: {
    setUserProfile(state, userProfile) {
      state.userProfile.id = userProfile.id
    },
    setUserName(state, userData) {
      state.userProfile.name = userData
    },
    selectedPlace(state, val){
      state.chosenPlace = val
    },
    setRouteData(state, val){
      state.routeData.push(val)
      console.log(state.routeData)

      let routes = []
      for (let i=0; i<this.state.routeData.length; i++){
        if (this.state.routeData[i].user == this.state.userProfile.id){
          routes.push(this.state.routeData[i])
        }
      }
      state.userProfile.routes = routes 
    },
    // LOGOUT MUTATIONS
    clearUserProfile(state, val){
      state.userProfile = val
    },
    clearUserRoutes(state){
      state.routeData = []
    },
  },
  getters:{
    //
  },
  actions: {

    async fetchRouteData({ commit }){
      //fetch route data from Cloud Firestore
      commit('clearUserRoutes')
      await fb.routeData.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // set route data in state
            commit('setRouteData', doc.data())
        });
      });
    },

    async register({ dispatch }, form) {
      // register new user, and sign them in
      await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      const user = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      //await fb.userData.doc(user).add(form.name);

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },

    async login({ dispatch }, form) {
      // sign user in
      const user = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
  
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      const userData = await fb.usersData.doc(userProfile.id).get()

      // set user profile in state
      commit('setUserProfile', userProfile)
      commit('setUserName', userData.data().name)

      // change route to dashboard
      router.push('/').catch(()=>{})
    },

    async logout({ commit }) {
      await fb.auth.signOut()
    
      // clear userProfile and redirect to /login
      commit('clearUserProfile', {})
      commit('clearUserRoutes')
      router.push('/login').catch(()=>{})
    }
  },
  modules: {
    //
  }
})
