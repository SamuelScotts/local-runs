<template>
  <div>
    <div id="map" class ="mapx" style="width: 100%; height: 90vh;"></div>
    <div ref="popup">
      <v-card>
        <v-card-text>
          {{ routeName }}
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
  import 'ol/ol.css'

  export default {
    name: 'Map',

    data () {
      return {
        routeData:[
          {
            name: 'Auchterarer Chilli Trail',
            latlng_lng: -3.698496, 
            latlng_lat: 56.292576,
          },
          {
            name: 'Dunning Den Trail',
            latlng_lng: -3.578053, 
            latlng_lat: 56.306923,
          },
        ],
        routeName: '',
      }
    },

    methods: {
      initMap(){
        let routes = []
        for (let i=0; i<this.routeData.length; i++){
          let route = new Feature({
            type: 'click',
            name: this.routeData[i].name,
            geometry: new Point(fromLonLat([this.routeData[i].latlng_lng, this.routeData[i].latlng_lat]))
          })
          routes.push(route);
        }
        
        let vectorSource = new VectorSource({
          features: routes
        });
  
        let vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        let view = new View({
            zoom: 6.5,
            center: [-452507.207448, 7709734.866327],
            constrainResolution: true
          })

        // MAIN SECTION - DISPLAY MAP
        let map = new Map({
          target: 'map',
          view: view,
          layers: [
            new Tile({
              source: new OSM()
            }),
            vectorLayer
          ],
          loadTilesWhileAnimating: true,
        })

        // ADD POPUP OVERLAY
        let popup = new Overlay({
          element: this.$refs.popup
        });
        map.addOverlay(popup);

        // CREATE POPUP ON SINGLE CLICK AT SPECIFIC POINT - REMOVE POPUP ALSO.
        map.on('singleclick', (evt) => {
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
            }
        });

        // ADJUST CURSER BASED ON HOVERING OVER ROUTE
        map.on("pointermove", function (evt) {
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
    },

    mounted() {
      this.initMap()
    },
  }
</script>
