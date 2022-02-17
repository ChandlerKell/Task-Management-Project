<template>
  <v-dialog v-model="dialog" persistent max-width="1024px" width="90%" :retain-focus="false">
    <v-card>
      <v-card-title>
        <span class="headline mb-4">New User</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  filled
                  v-model="user.name"
                  label="Name"
                  :rules="rules.required"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  filled
                  v-model="user.email"
                  label="Email Address"
                  :rules="rules.required"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  filled
                  v-model="user.password"
                  label="Password"
                  :rules="rules.required"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-12">
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="success" @click="create" :disabled="!valid">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
  export default {
    name: "NewUser",
    components: {  },
    props: ["dialog"],
    data() {
      return {
        valid: false,
        rules: {
          required: [(value) => !!value || "Required"],
        },
        user: {
            name: "",
            email: "", 
            password: "",
        },
      };
    },
    async created() {
    },
    methods: {
        closeDialog() {
            this.$emit("close");
        },
        async create() {
            await axios.post("http://host.docker.internal:8001/users", this.user)
              .then(() => {
                this.showSuccessNotification("Tech notification is successfully created.");

                this.$emit("refresh");

                this.closeDialog();
              })
              .catch(() => {
                this.showErrorNotification();
              });
        },
    },
  };
</script>
