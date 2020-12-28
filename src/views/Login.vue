<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="4"></v-col>
      <v-col cols="12" sm="4">
        <h1 class="mt-12" align="center" style="cursor: pointer" @click="$router.push('/')">RUN SCOTLAND</h1>
        <!-- <v-img class="mt-12" src="../assets/localroutes.png" @click="$router.push('/')" style="cursor: pointer"></v-img> -->
        <v-card class="pa-8 mt-4" flat>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field color="black" prepend-icon="mdi-account" v-model="loginForm.email" label="Email" required></v-text-field>
                  <v-text-field color="black" v-model="loginForm.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Passowrd" prepend-icon="mdi-lock" @click:append="show1 = !show1"></v-text-field>
                  <v-btn block class="mt-4" dark @click="login()">Login</v-btn>
                  <a href="#"><p class="subtitle-2 text-center mt-8">Forgot your password?</p></a>
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
      show1: false,
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
