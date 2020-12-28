<template>
  <div id="map"></div>
</template>

<script>
/* eslint-disable */
// import openlayer css for style
import "ol/ol.css";
// This is library of openlayer for handle map
import Map from "ol/Map";
import View from "ol/View";
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';

export default {
  async mounted() {
    await this.initiateMap();
  },
  
  methods: {
    initiateMap() {
      // create vector layer
      let source = new VectorSource();
      let vector = new VectorLayer({
        source: source
      });
      // Create our initial map view
      let view = new View({
        projection: "EPSG:3857",
        center: [-412587.969426, 7616993.685547], 
        zoom: 13,
      });
      var tile = new TileLayer({
        source: new OSM(),
      });
      // Now create our map
      new Map({
        target: 'map',
        view: view,
        layers: [tile, vector],
        loadTilesWhileAnimating: true,
      });
    },
  },

  computed:{
        routes(){
          return this.$store.state.routes
        },
        locations(){
          return this.$store.state.locations
        }
    },
};
</script>

<style>
#map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 640px;
  width: 100%;
}
</style>