<template>
  <div>
    <NavBar/>
    <Map/>
  </div>
</template>

<script>

import NavBar from '../components/NavBar';
import Map from '../components/Map';

export default {
  name: "Home",

  components: {
    NavBar,
    Map,
  },

  data() {
    return {
      //
    }
  },
}
</script>