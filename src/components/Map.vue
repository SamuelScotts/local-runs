<template>
  <div>
    <div id="map"
        style="width: 100%; height: 90vh;">
    </div>
    <div id="popup">
    </div>
  </div>
</template>

<script>
  import View from 'ol/View'
  import Map from 'ol/Map'
  import TileLayer from 'ol/layer/Tile'
  import OSM from 'ol/source/OSM'
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import GeoJSON from 'ol/format/GeoJSON'

  // importing the OpenLayers stylesheet is required for having
  // good looking buttons!
  import 'ol/ol.css'

  const data = {
    type: 'Feature',
    properties: {
      name: 'Auchterarder',
    },
    geometry: {
      type: 'Point',
      coordinates: [-3.698496, 56.292576]
    }
  };

  export default {
    name: 'Map',
    components: {},
    props: {},
    mounted() {

      // a feature (geospatial object) is created from the GeoJSON
      const feature = new GeoJSON().readFeature(data, {
        // this is required since GeoJSON uses latitude/longitude,
        // but the map is rendered using “Web Mercator”
        featureProjection: 'EPSG:3857'
      });

      // a new vector layer is created with the feature
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [feature],
        }),
      })
      // this is where we create the OpenLayers map
      new Map({
        // the map will be created using the 'map-root' ref
        target: 'map',
        layers: [
          // adding a background tiled layer
          new TileLayer({
            source: new OSM() // tiles are served by OpenStreetMap
          }),
          vectorLayer
        ],

        // the map view will initially show the whole world
        view: new View({
          zoom: 6.5,
          center: [-452507.207448, 7709734.866327],
          constrainResolution: true
        }),
      })
    },
  }
</script>