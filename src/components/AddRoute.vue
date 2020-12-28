<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-4" large dark v-bind="attrs" v-on="on">
          ADD ROUTE
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          ADD A NEW ROUTE...
        </v-card-title>

        <v-card-text>
            <v-form v-model="valid">
                <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="email" label="Run name" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                    <v-text-field v-model="firstname" label="Latitude Coordinate" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                    <v-text-field v-model="lastname" label="Longitude Coordinate" required ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                    <v-text-field v-model="firstname" label="Distance in miles" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                    <v-select width="1" class="mt-3" flat outlined dense label="Run Type" solo :items="items"></v-select>
                    </v-col>
                </v-row>
                </v-container>
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn text @click="dialog = false">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "AddRoute",
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>