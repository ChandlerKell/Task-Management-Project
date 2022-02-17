<template>
  <v-container>
    <v-row class="text-center mt-10">
        <v-card color="primary" class="pa-2 ml-auto mr-auto mt-10">
            <form class="form-group">
                <input v-model="usernameEntered" type="email" class="form-control white" placeholder="not a Username" required>
                <br>
                <input v-model="passwordEntered" type="password" class="white form-control" placeholder="Password" required>
                <br>
                <v-btn @click="newUserDialogue = true" class="btn grey">Create User</v-btn>
                <br>

                <router-link class="grey" :to="{name: 'Tasks'}">
                  <v-btn @click="doLogin">Login</v-btn>
                </router-link>
            </form>
        </v-card>
    </v-row>
    <new-user
        v-if="newUserDialogue"
        :dialog="newUserDialogue"
        @close="newUserDialogue = false"
    ></new-user>
  </v-container>
</template>

<script>
import NewUser from "./NewUser";
  export default {
    name: 'Login',
    components: { NewUser },
    data: () => ({
      usernameEntered: "",
      passwordEntered: "",
      newUserDialogue: false, 
    }),
    methods: {
      doLogin() {
        console.log("submit button clicked");
      },
    },
  }
</script>
