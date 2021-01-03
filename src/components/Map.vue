<template>
  <div>

    <div id="map" style="position: relative; width: 100%; height: 90.8vh; z-index:0"></div>
    <div id="display" style="position: absolute; top: 100px; left: 1050px; width: 17rem; z-index:1">
      <v-card v-if="show">
        <v-card-title>
          {{ routeName }}
        </v-card-title>
        <v-card-subtitle> {{routeLocation}} </v-card-subtitle>
        <v-card-text>
          Distance: {{ routeDistance }} miles<br/>
          Difficulty: {{ routeDifficulty }}<br/>
          Terrain: {{ routeTerrain }}<br/>
        </v-card-text>
        <v-card-actions>
          <v-btn class="mt-n2" x-small>Download GPX</v-btn>
          <v-btn class="mt-n2" x-small @click="plotRoute()">Plot on map</v-btn>
          <v-spacer></v-spacer>
          <v-icon class="mr-2 mb-2" color="#e31b23">mdi-heart</v-icon>{{routeLikes}}
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title>
          Welcome to Run Scotland
        </v-card-title>
        <v-card-text>
          1.) Find and download a run<br/>
          OR<br/>
          2.) Upload one of your runs.
        </v-card-text>
      </v-card>
    </div>

    <!-- <div ref="popup">
      <v-card>
        <v-card-subtitle>
          {{ routeName }}
        </v-card-subtitle>

      </v-card>
    </div> -->
  
  </div>
</template>

<script>
  import View from 'ol/View'
  import Map from 'ol/Map'
  import Tile from 'ol/layer/Tile'
  import OSM from 'ol/source/OSM'
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import Feature from 'ol/Feature'
  import Point from 'ol/geom/Point'
  //import Overlay from 'ol/Overlay'
  import {fromLonLat} from 'ol/proj';
  //import GPX from 'ol/format/GPX';  //REQUIRED FOR ROUTEMAPPING
  //import {Stroke, Style} from 'ol/style.js'; //REQUIRED FOR ROUTEMAPPING
  import 'ol/ol.css'

  //import dunning from '../gpx/dunning_den_trail.gpx'; //REQUIRED FOR ROUTEMAPPING
  //import auchterarder from '../gpx/auchterarder_chilli_trail.gpx' //REQUIRED FOR ROUTEMAPPING
  //import blackford from '../gpx/blackford_kinpauch_hill.gpx'  //REQUIRED FOR ROUTEMAPPING

  export default {
    name: 'Map',

    data () {
      return {
        routeName: '',
        routeDistance: '',
        lon: -452507.207448,
        lat: 7709734.866327,
        zoom: 6.5,
        map: null,
        show: false,
        //routeGPX: [dunning, auchterarder, blackford], //REQUIRED FOR ROUTEMAPPING
        routes: [],
      }
    },

    methods: {
      initMap(){
        for (let i=0; i<this.routeData.length; i++){
          let route = new Feature({
            type: 'click',
            name: this.routeData[i].name,
            location: this.routeData[i].location,
            distance: this.routeData[i].distance,
            difficulty: this.routeData[i].difficulty,
            terrain: this.routeData[i].terrain,
            likes: this.routeData[i].likes,
            geometry: new Point(fromLonLat([this.routeData[i].latlng_lng, this.routeData[i].latlng_lat]))
          })
          this.routes.push(route);
        }
        
        let routeMarkers= new VectorLayer({
          source: new VectorSource({
            features: this.routes
          }),
        });

        //INITIAL ADDITION OF ROUTE MAPPING
        /* var style = {
          'LineString': new Style({
            stroke: new Stroke({
              color: '#f00',
              width: 3,
            }),
          }),
        };

        let dunningMapping = new VectorLayer({
          source: new VectorSource({
            url: dunning,
            format: new GPX(),
          }),
          style: style['LineString'],
        });

        let auchterarderMapping = new VectorLayer({
          source: new VectorSource({
            url: auchterarder,
            format: new GPX(),
          }),
          style: style['LineString'],
        });

        let blackfordMapping = new VectorLayer({
          source: new VectorSource({
            url: blackford,
            format: new GPX(),
          }),
          style: style['LineString'],
        }); */

        let view = new View({
            zoom: this.zoom,
            center: [this.lon, this.lat],
            constrainResolution: true
          })

        // MAIN SECTION - DISPLAY MAP
        this.map = new Map({
          target: 'map',
          view: view,
          layers: [
            new Tile({
              source: new OSM()
            }),
            routeMarkers,
            //dunningMapping,  //INITIAL ADDITION OF ROUTE MAPPING
            //auchterarderMapping,  //INITIAL ADDITION OF ROUTE MAPPING
            //blackfordMapping  //INITIAL ADDITION OF ROUTE MAPPING
          ],
          loadTilesWhileAnimating: true,
        })

        // WORK IN PROGRESS TO ADJUST ADDITION OF ROUTE MAPPING
        /* let routeMapping = [];
        for (let i=0; i<this.routeGPX.length; i++){
          routeMapping = new VectorLayer({
                    source: new VectorSource({
                      url: this.routeGPX[i],
                      format: new GPX(),
                    }),
                    style: style['LineString'],
                  });
                
        }
        for (let j=0; j<routeMapping.length; j++){
        this.map.addLayer(routeMapping[j]);
        } */

        /* // ADD POPUP OVERLAY
        let popup = new Overlay({
          element: this.$refs.popup
        });
        this.map.addOverlay(popup); */

        // CREATE POPUP ON SINGLE CLICK AT SPECIFIC POINT - REMOVE POPUP ALSO.
        this.map.on('singleclick', (evt) => {
          //popup.setPosition(undefined);
          this.show= false
          let feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
            return feature;
          });
          if (feature) {
            //let geometry = feature.getGeometry();
            //let coord = geometry.getCoordinates();
            let props = feature.getProperties();
            //popup.setPosition(coord);
            this.show = 'true';
            this.routeName = props.name;
            this.routeLocation = props.location;
            this.routeDistance = props.distance;
            this.routeDifficulty = props.difficulty;
            this.routeTerrain = props.terrain;
            this.routeLikes = props.likes;
            }
        });

        // ADJUST CURSER BASED ON HOVERING OVER ROUTE
        this.map.on("pointermove", function (evt) {
          let hit = evt.map.forEachFeatureAtPixel(evt.pixel, function() {
              return true;
          }); 
          if (hit) {
              this.getTargetElement().style.cursor = 'pointer';
          } else {
              this.getTargetElement().style.cursor = '';
          }
        });
      },

      newView(){
        for (let i=0; i<this.locations.length; i++){
          if (this.chosenPlace == this.locations[i].name){
            this.lon = this.locations[i].lon
            this.lat = this.locations[i].lat
            this.zoom = this.locations[i].zoom
          }
        }
        this.show = false;
        this.map.dispose();
        this.initMap();
      },

      newRoute(){
        this.map.dispose();
        this.initMap()
      },

      getRouteData(){
        this.$store.dispatch('fetchRouteData');
      }
      
    },

    computed: {
      routeData(){
        return this.$store.state.routeData
      },
      locations(){
        return this.$store.state.locations
      },
      chosenPlace(){
        return this.$store.state.chosenPlace
      },
    }, 

    watch: {
      '$store.state.chosenPlace': function() {
        this.newView()
      },
      '$store.state.routeData': function() {
        this.newRoute()
      },
    },

    mounted() {
      this.initMap()
      this.getRouteData()
    },
  }
</script>