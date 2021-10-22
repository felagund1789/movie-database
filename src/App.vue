<template>
  <v-app>
    <v-app-bar app color="secondary">
      <v-toolbar-title>
        <span class="primary--text"><b>Movie Database</b></span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-img src="./assets/logo-dark.png" contain max-height="150"></v-img>

      <template v-slot:extension>
        <v-tabs v-model="currentPath" color="primary">
          <v-tab to="/movies">
            <v-icon>mdi-film</v-icon>
            Movies
          </v-tab>

          <v-tabs-slider color="primary"></v-tabs-slider>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    selectedItem: 0,
    currentPath: null,
    showDialog: false
  }),

  methods: {
    logout() {
      window.keycloak.logout();
    }
  }
};
</script>
