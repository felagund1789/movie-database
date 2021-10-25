<template>
  <v-card>
    <v-img
      align-left
      v-if="movie.Poster"
      max-height="360"
      contain
      :lazy-src="posterPlaceholder"
      :src="movie.Poster"
    ></v-img>
    <v-card-title>{{ movie.Title }}</v-card-title>
    <v-card-subtitle
      >{{ movie.Year }} &middot; {{ movie.Rated }} &middot;
      {{ movie.Runtime }}</v-card-subtitle
    >
    <v-card-text>
      <v-row>
        <v-col cols="8">
          <v-chip-group v-if="movie.Genre">
            <v-chip
              outlined
              color="strong"
              v-for="genre in movie.Genre.split(',')"
              :key="genre"
              >{{ genre }}</v-chip
            >
          </v-chip-group>
        </v-col>
        <v-col cols="4" align="center">
          <template v-if="movie.imdbRating">
            <div><b>IMDb RATING</b></div>
            <div>
              <v-icon large color="primary">mdi-star</v-icon>&nbsp;
              <span class="strong--text">
                <b>{{ movie.imdbRating }}</b>
              </span>
              /10
            </div>
          </template>
        </v-col>
      </v-row>
      <v-row v-if="movie.Plot" class="separator">
        <v-col>{{ movie.Plot }}</v-col>
      </v-row>
      <v-row v-if="movie.Director" class="separator">
        <v-col cols="2" class="strong--text">
          <template v-if="movie.Director.split(',').length > 1"
            >Directors</template
          >
          <template v-if="movie.Director.split(',').length === 1"
            >Director</template
          >
        </v-col>
        <v-col cols="10">{{ movie.Director }}</v-col>
      </v-row>
      <v-row v-if="movie.Writer" class="separator">
        <v-col cols="2" class="strong--text">
          <template v-if="movie.Writer.split(',').length > 1">Writers</template>
          <template v-if="movie.Writer.split(',').length === 1"
            >Writer</template
          >
        </v-col>
        <v-col cols="10">{{ movie.Writer }}</v-col>
      </v-row>
      <v-row v-if="movie.Actors" class="separator">
        <v-col cols="2" class="strong--text">Stars</v-col>
        <v-col cols="10">{{ movie.Actors }}</v-col>
      </v-row>
      <v-row v-if="movie.Ratings">
        <v-col cols="2" class="strong--text">Ratings</v-col>
        <v-col cols="10">
          <div v-for="rating in movie.Ratings" :key="rating.Source">
            {{ rating.Source }}:
            <span class="strong--text">{{ rating.Value }}</span>
            <v-rating
              background-color="grey"
              half-increments
              length="5"
              readonly
              :value="getRatingValue(rating.Value, 5)"
            ></v-rating>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary secondary--text" @click="close"> Close </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { POSTER_PLACEHOLDER_IMAGE } from "../config";
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
    movie: {},
    posterPlaceholder: POSTER_PLACEHOLDER_IMAGE
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

    getRatingValue(rating, stars) {
      return stars * eval(rating.replace("%", "/100"));
    },

    close() {
      this.$emit("change", false);
    }
  }
};
</script>

<style scoped>
.row.separator {
  border-bottom: grey 1px solid;
}
</style>
