<template>
  <div>
    <v-app-bar color="#FFFFFF" flat outlined>
        <v-toolbar-title class="ml-6" style="cursor: pointer" @click="$router.push('/')"><h1>RUN SCOTLAND</h1></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select width="1" class="mt-6 mr-12" dense label="Find a route..." solo :items="items"></v-select>
        <AddRoute/>
        <v-btn @click="$router.push('/login')" dark large>Login</v-btn>
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
      items: [],
    }
  },
}
</script>