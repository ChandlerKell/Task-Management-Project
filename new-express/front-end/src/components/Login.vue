<template>
  <v-container>
    <v-row class="text-center mt-10">
        <v-card color="primary" class="pa-2 ml-auto mr-auto mt-10">
            <form class="form-group">
                <input v-model="loginInfo.email" type="email" class="form-control white" placeholder="Email" required>
                <br>
                <input v-model="loginInfo.password" type="password" class="white form-control" placeholder="Password" required>
                <br>
                <v-btn @click="newUserDialogue = true" class="btn grey">Create User</v-btn>
                <br>

                <v-btn @click="doLogin">Login</v-btn>
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
 import axios from "axios";
  export default {
    name: 'Login',
    components: { NewUser },
    data: () => ({
      loginInfo: {
        email: "",
        password: "",
      },
      newUserDialogue: false, 
      login: false,
    }),
    methods: {
      async doLogin() {
        this.login = await axios.put("http://host.docker.internal:8001/login", this.loginInfo).then((res) => res.data); 
        if(this.login){
          //this.$store.dispatch("authenticate");
          this.$router.push('/tasks');
        }
      },
    },
  }
</script>
