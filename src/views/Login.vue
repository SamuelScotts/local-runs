<template>
  <v-container>

    <v-row>
      <v-col cols="12" sm="4"></v-col>

      <v-col cols="12" sm="4">
        <v-img class="mt-12" src="../assets/localroutes.png" @click="$router.push('/')" style="cursor: pointer"></v-img>
        <!-- <h1 class="mt-12" align="center" style="cursor: pointer" @click="$router.push('/')">RUN SCOTLAND</h1> -->
      </v-col>

      <v-col cols="12" sm="4"></v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" sm="4"></v-col>
      
      <v-col cols="12" sm="4" v-if="signup">
        <v-card class="pa-8 mt-4" flat>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field color="black" prepend-icon="mdi-account" v-model="loginForm.email" label="Email" required></v-text-field>
                  <v-text-field color="black" v-model="loginForm.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Password" prepend-icon="mdi-lock" @click:append="show1 = !show1"></v-text-field>
                  <v-btn block class="mt-4" dark @click="register()">Sign-up</v-btn>
                  <v-btn block class="mt-4" dark small @click="signup=false">I've already got an account...</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" v-else>
        <v-card class="pa-8 mt-4" flat>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field color="black" prepend-icon="mdi-account" v-model="loginForm.email" label="Email" required></v-text-field>
                  <v-text-field color="black" v-model="loginForm.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Password" prepend-icon="mdi-lock" @click:append="show1 = !show1"></v-text-field>
                  <v-btn block class="mt-4" dark @click="login()">Login</v-btn>
                  <v-btn block class="mt-4" dark small>Forgotten your password?</v-btn>
                  <v-btn block class="mt-4" dark small @click="signup=true">Lets create an account!</v-btn> 
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
      signup: false,
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
    },
    register(){
      this.$store.dispatch('register', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
      this.signup = false
    }
  },
}
</script>
