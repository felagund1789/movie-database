<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      shrink-on-scroll
      prominent
      src="./assets/movies2.jpg"
      fade-img-on-scroll
    >
      <v-toolbar-title>
        <span class="primary--text"><b>Movie Database</b></span>
      </v-toolbar-title>

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
