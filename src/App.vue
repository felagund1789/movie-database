<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      shrink-on-scroll
      prominent
      src="./assets/movies.jpg"
      fade-img-on-scroll
    >
      <v-toolbar-title>
        <span class="primary--text"><b>Movie Database</b></span>
      </v-toolbar-title>

      <template v-slot:extension>
        <v-tabs v-model="currentPath">
          <v-tab :to="{ name: 'movies' }" class="transparent primary--text">
            <v-icon v-if="$route.path.indexOf('movies') > -1">
              mdi-movie
            </v-icon>
            Movies
          </v-tab>

          <v-tab :to="{ name: 'series' }" class="transparent primary--text">
            <v-icon v-if="$route.path.indexOf('series') > -1">
              mdi-television-box
            </v-icon>
            Series
          </v-tab>

          <v-tab :to="{ name: 'games' }" class="transparent primary--text">
            <v-icon v-if="$route.path.indexOf('games') > -1">
              mdi-google-controller
            </v-icon>
            Games
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
    currentPath: null
  }),

  methods: {}
};
</script>

<style scoped>
.transparent {
  background-color: rgba(0, 0, 0, 0);
}
</style>
