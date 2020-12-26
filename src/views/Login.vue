<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="loginForm.email" label="Email" required></v-text-field>
          <v-text-field v-model="loginForm.password" label="Password" required></v-text-field>
          <v-btn @click="login()">Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },

  methods:{
    login(){
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    }
  },
}
</script>