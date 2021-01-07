<template>
  <div>
    <h1>Dashboard</h1>
    <h1>Hello {{userProfile.name}}</h1>
    <v-btn @click="$router.push('/')">Routes</v-btn>
    <v-btn class="ml-4" @click="logout()">Logout</v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapState(['userProfile']),
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
    }
  },
}
</script>