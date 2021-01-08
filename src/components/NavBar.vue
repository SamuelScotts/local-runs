<template>
  <div>
    <v-app-bar color="#FFFFFF" flat outlined>
        <v-toolbar-title class="ml-6" style="cursor: pointer" @click="returnToScotlandView()"><h1>RUN SCOTLAND</h1></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select class="mt-6 mr-6" dense label="Choose your area..." dark solo :items="this.places" v-model="selectedPlace"></v-select>
        <v-autocomplete v-model="enteredRoute" :items="this.places" :search-input.sync="search" cache-items class="mr-6" dark dense hide-details label="Find a route..." solo @keypress.enter="submit()"></v-autocomplete>
        <AddRoute/>
        <v-btn class="mr-4" @click="$router.push('/dashboard')" dark large>Profile</v-btn>
        <v-btn @click="logout()" dark large>Logout</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import AddRoute from '../components/AddRoute';

export default {
  name: "NavBar",

  components: {
    AddRoute,
  },

  data() {
    return {
      search: null,
      selectedPlace: '',
      enteredRoute: '',
      places:['Scotland','Auchterarder', 'Dunning', 'Blackford']
    }
  },

  methods:{
    submit(){
      console.log(this.enteredRoute);
    },
    returnToScotlandView(){
      this.selectedPlace = 'Scotland';
    },
    logout(){
      this.$store.dispatch('logout')
    },
  },

  watch: {
    selectedPlace(newPlace){
      this.$store.commit('selectedPlace', newPlace);
    }
  },  

  computed: {
    routeData(){
      return this.$store.state.routeData
    } 
  },
}
</script>