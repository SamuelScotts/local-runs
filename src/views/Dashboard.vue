<template>
  <div>
    <h1>Dashboard</h1>
    <v-btn @click="logout()">Logout</v-btn>
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
    ...mapState(['userProfile'])
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
    }
  },
}
</script>