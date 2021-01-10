<template>
  <div>
    <NavBar/>
    <v-container class="grey lighten-5 mt-4">
      <v-row>
        <v-col cols="12" sm="12">
          <v-card class="pa-2" outlined tile>
            <h1 class="ml-3 mb-3">Hello {{userName}}.  Here are your routes:</h1>
              <v-data-table :headers="headers" :items="this.userRoutes" :items-per-page="10" flat></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '../components/NavBar'

export default {
  components:{
    NavBar
  },
  data() {
    return {
      headers:[{
        text: "Route Name:",
        value: 'name',
      },
      {
        text: "Distance:",
        value: 'distance',
      },
      {
        text: "Location:",
        value: 'location',
      },
      {
        text: "Difficulty:",
        value: 'difficulty',
      },
      {
        text: "Terrain:",
        value: 'terrain',
      },
      {
        text: "Likes:",
        value: 'likes',
      },
      {
        text: "Delete:",
      },
      ],
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
    userName(){
      return this.$store.state.userProfile.name
    },
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
    },
  },
}
</script>