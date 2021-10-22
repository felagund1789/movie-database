<template>
  <v-card :data-id="movie.imdbID">
    <template v-if="movie && movie.Poster">
      <v-img
        v-if="movie.Poster !== 'N/A'"
        max-height="360"
        lazy-src="images/poster-placeholder.png"
        :src="movie.Poster"
      ></v-img>
      <v-img
        v-if="movie.Poster === 'N/A'"
        max-height="360"
        src="images/poster-placeholder.png"
      ></v-img>
    </template>
    <v-card-text>
      <h3>{{ movie.Title }} ({{ movie.Year }})</h3>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  model: {
    prop: "data",
    event: "change"
  },
  props: {
    data: Boolean,
    movie: Object
  },
  data: () => ({}),
  methods: {}
};
</script>
