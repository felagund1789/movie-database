<template>
  <v-card :data-id="movie.imdbID">
    <template v-if="movie && movie.Poster">
      <v-img
        v-if="movie.Poster !== 'N/A'"
        max-height="360"
        :lazy-src="posterPlaceholder"
        :src="movie.Poster"
      ></v-img>
      <v-img
        v-if="movie.Poster === 'N/A'"
        max-height="360"
        :src="posterPlaceholder"
      ></v-img>
    </template>
    <v-card-text>
      <h3>{{ movie.Title }} ({{ movie.Year }})</h3>
    </v-card-text>
  </v-card>
</template>

<script>
import { POSTER_PLACEHOLDER_IMAGE } from "../config";

export default {
  model: {
    prop: "data",
    event: "change"
  },
  props: {
    data: Boolean,
    movie: Object
  },
  data: () => ({
    posterPlaceholder: POSTER_PLACEHOLDER_IMAGE
  }),
  methods: {}
};
</script>
