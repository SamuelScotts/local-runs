<template>
  <div>
    <div id="map" class ="mapx" style="width: 100%; height: 90vh;"></div>
    <div id="popup">
      <v-card>
        <v-card-text>
          RUN TITLE
        </v-card-text>
        <v-card-actions>
        <v-btn x-small>GPX</v-btn>
        <v-btn x-small>Close</v-btn>
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

  // importing the OpenLayers stylesheet is required for having
  // good looking buttons!
  import 'ol/ol.css'

  export default {
    name: 'Map',

    data () {
      return {
        //
      }
    },

    methods: {
      initMap(){

        let data = new Feature({
          type: 'click',
          name: 'Auchterarder',
          geometry: new Point(fromLonLat([-3.698496, 56.292576]))
        })
        let datas = []
        datas.push(data);

        let vectorSource = new VectorSource({
          features: datas
        });
  
        let vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        const view = new View({
            zoom: 6.5,
            center: [-452507.207448, 7709734.866327],
            constrainResolution: true
          })

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

        let popup = new Overlay({
        });
        map.addOverlay(popup)

        map.on('singleclick', function(evt){
          let feature = map.forEachFeatureAtPixel(evt.pixel, function(feature){
            return feature;
          })
          
          if(feature){
            let coord = feature.getGeometry().getCoordinates();
            popup.setPosition(coord)
          }

        })

      },
    
    },

    mounted() {
      this.initMap()
    },
  }
</script>