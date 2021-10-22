<template>
  <v-card>
    <v-card-title>{{ movie.Title }} ({{ movie.Year }})</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-img
            align-left
            v-if="movie.Poster"
            contain
            max-height="360"
            :src="movie.Poster"
          ></v-img>
        </v-col>
        <v-col>
          {{ movie.Plot }}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="close"> Close </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import MovieService from "../services/MovieService";

export default {
  model: {
    prop: "data",
    event: "change"
  },
  props: {
    data: Boolean,
    movieId: String
  },
  data: () => ({
    movie: {}
  }),
  watch: {
    movieId() {
      this.getMovie();
    }
  },
  created() {
    this.getMovie();
  },
  methods: {
    async getMovie() {
      if (this.movieId) {
        let response = await MovieService.getMovie(this.movieId);
        this.movie = response.data;
      } else {
        this.movie = {};
      }
    },

    close() {
      this.$emit("change", false);
    }
  }
};
</script>
