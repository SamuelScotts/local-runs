<template>
  <div>
    <v-app-bar color="#FFFFFF" flat outlined>
        <v-toolbar-title class="ml-6" style="cursor: pointer" @click="returnToScotlandView()"><h1>RUN SCOTLAND</h1></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select class="mt-6 mr-6" dense label="Choose your area..." dark solo :items="this.places" v-model="selectedPlace"></v-select>
        <v-btn class="mr-4" @click="$router.push('/')" dark>Routes</v-btn>
        <AddRoute/>
        <v-btn class="mr-4" @click="$router.push('/dashboard')" dark>Profile</v-btn>
        <v-btn @click="logout()" dark>Logout</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import router from '../router/index'
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
      router.push('/').catch(()=>{})
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