<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-4" large dark v-bind="attrs" v-on="on">
          ADD ROUTE
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          ADD A NEW ROUTE...
        </v-card-title>

        <v-card-text>
            <v-form>
                <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field prepend-icon="mdi-run" v-model="newRoute.name" label="Run name" color="#000" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select prepend-icon="mdi-map-marker" width="1" class="mt-3" :items="this.locations" v-model="newRoute.location" flat outlined dense label="Location" color="#000" solo></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                    <v-text-field prepend-icon="mdi-compass" v-model.number="newRoute.latlng_lat" label="Latitude" color="#000" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                    <v-text-field prepend-icon="mdi-compass" v-model.number="newRoute.latlng_lng" label="Longitude" color="#000" required ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                    <v-text-field prepend-icon="mdi-map-marker-distance" v-model="newRoute.distance" label="Distance in miles" color="#000" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-file-input accept=".gpx" label="Upload GPX file" ></v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                    <v-select width="1" class="mt-3" :items="this.types" chips label="Run Type" color="#000" v-model="newRoute.terrain" flat dense outlined multiple solo></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                    <v-select width="1" class="mt-3" :items="this.scale" v-model="newRoute.difficulty" flat outlined dense label="Difficulty" color="#000" solo></v-select>
                    </v-col>
                </v-row>
                </v-container>
            </v-form>
        </v-card-text>


        

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn text @click="dialog = false, clearForm()">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false, addRoute()">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  import * as fb from '../firebase'

  export default {
    name: "AddRoute",
    data () {
      return {
        dialog: false,
        types: ['Road', 'Hill', 'Trail'],
        scale: ['1/10', '2/10', '3/10', '4/10', '5/10', '6/10', '7/10', '8/10', '9/10', '10/10'],
        locations:['Auchterarder', 'Dunning', 'Blackford'],
        newRoute:{
        name: '',
        location: '',
        distance: '',
        latlng_lng: null, 
        latlng_lat: null,
        difficulty: '',
        terrain: '',
        likes: 0,
        user: null,
        },
      }
    },

    methods:{
      async addRoute(){
        this.newRoute.user = this.userProfile.id
        console.log(this.newRoute)
        await fb.routeData.add(this.newRoute);
        //this.$store.dispatch('fetchRouteData');
        this.$store.commit('setRouteData', this.newRoute)
        //this.$store.commit('fetchUserProfile')
      },

      clearForm(){
        this.newRoute.name = '',
        this.newRoute.location = '',
        this.newRoute.distance = '',
        this.newRoute.latlng_lng = null,
        this.newRoute.latlng_lat = null,
        this.newRoute.difficulty = '',
        this.newRoute.terrain = ''
      },
    },

    computed: {
      userProfile(){
        return this.$store.state.userProfile
      },
    },
  }
</script>