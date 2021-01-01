<template>
  <div>
    <div id="map" style="width: 100%; height: 90.8vh;"></div>
    <div ref="popup">
      <v-card>
        <v-card-title>
          {{ routeName }}
        </v-card-title>
        <v-card-text>
          Route Distance: {{ routeDistance }}
        </v-card-text>
        <v-card-actions>
        <v-btn x-small>DOWNLOAD GPX</v-btn>
        </v-card-actions>
      </v-card>
    </div>
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
  import Overlay from 'ol/Overlay'
  import {fromLonLat} from 'ol/proj';
  import GPX from 'ol/format/GPX';
  import {Stroke, Style} from 'ol/style.js';
  import 'ol/ol.css'

  import dunning from '../gpx/dunning_den_trail.gpx';
  import auchterarder from '../gpx/auchterarder_chilli_trail.gpx'
  import blackford from '../gpx/blackford_kinpauch_hill.gpx'

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
      }
    },

    methods: {
      initMap(){
        let routes = []
        for (let i=0; i<this.routeData.length; i++){
          let route = new Feature({
            type: 'click',
            name: this.routeData[i].name,
            distance: this.routeData[i].distance,
            geometry: new Point(fromLonLat([this.routeData[i].latlng_lng, this.routeData[i].latlng_lat]))
          })
          routes.push(route);
        }
        
        let routeMarkers= new VectorLayer({
          source: new VectorSource({
            features: routes
          }),
        });

        var style = {
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
        });

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
            dunningMapping,
            auchterarderMapping,
            blackfordMapping,
          ],
          loadTilesWhileAnimating: true,
        })

        // ADD POPUP OVERLAY
        let popup = new Overlay({
          element: this.$refs.popup
        });
        this.map.addOverlay(popup);

        // CREATE POPUP ON SINGLE CLICK AT SPECIFIC POINT - REMOVE POPUP ALSO.
        this.map.on('singleclick', (evt) => {
          popup.setPosition(undefined);
          let feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
            return feature;
          });
          if (feature) {
            let geometry = feature.getGeometry();
            let coord = geometry.getCoordinates();
            let props = feature.getProperties();
            popup.setPosition(coord);
            this.routeName = props.name;
            this.routeDistance = props.distance
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
        this.map.dispose()
        this.initMap()
      },
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
      }
    },

    mounted() {
      this.initMap()
    },
  }
</script>
