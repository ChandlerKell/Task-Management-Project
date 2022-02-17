<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="data:image/jpeg;base64,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"
          transition="scale-transition"
          width="60"
        />
      </div>
      <h1>Chandler Systems</h1>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <router-link class="grey" :to="{name: 'Login'}">Login</router-link>
      <v-spacer></v-spacer>
      <router-link class="grey" :to="{name: 'Tasks'}">Tasks</router-link>
      <v-spacer></v-spacer>
      <router-link class="grey" :to="{name: 'Projects'}">Projects</router-link>
      
    </v-app-bar>

    <v-main>
    
    <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
