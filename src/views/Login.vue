<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12" sm="4"></v-col>
      <v-col cols="12" sm="4">
        <v-img class="mt-12" src="../assets/localroutes.png"></v-img>
        <v-card class="pa-12 mt-4" outlined flat>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field v-model="loginForm.email" label="Email" required></v-text-field>
                  <v-text-field v-model="loginForm.password" label="Password" required></v-text-field>
                  <v-btn block class="primary mt-4" @click="login()">Login</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4"></v-col>
    </v-row>
  </v-container>


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
