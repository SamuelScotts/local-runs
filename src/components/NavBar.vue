<template>
  <div>
    <v-app-bar color="#FFFFFF" flat outlined>
        <v-toolbar-title class="ml-6" style="cursor: pointer" @click="$router.push('/')"><h1>LOCAL ROUTES</h1></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select width="1" class="mt-6 mr-10" dense label="Where are you running?" solo :items="items"></v-select>
        <v-btn  @click="$router.push('/login')" dark large>Login</v-btn>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: "NavBar",

  data() {
    return {
      items: ['Auchterarder', 'Blackford', 'Dunning']
    }
  },
}
</script>