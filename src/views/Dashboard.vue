<template>
  <div>
    <h1>Dashboard</h1>
    <h1>Hello {{userProfile.id}}</h1>
    <h2>Your routes:</h2>
      <v-data-table :headers="headers" :items="this.userRoutes" :items-per-page="10" class="elevation-1"></v-data-table>
    <v-btn @click="$router.push('/')">Routes</v-btn>
    <v-btn class="ml-4" @click="logout()">Logout</v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      headers:[{
        text: "Route Name:",
        value: 'name',
      },
      {
        text: "Distance:",
        value: 'distance',
      },]
    }
  },
  computed: {
    ...mapState(['userProfile']),
    userProfile(){
      return this.$store.state.userProfile
    },
    userRoutes(){
      return this.$store.state.userProfile.routes
    },
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
    },
  },
  created(){
    //
  }
}
</script>