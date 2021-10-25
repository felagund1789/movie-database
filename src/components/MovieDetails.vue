<template>
  <v-card align="center">
    <v-card-title>{{ movie.Title }}</v-card-title>
    <v-card-subtitle class="pa-0 ma-0" ref="imagesubtitle">
      <img
        :dataId="movie.imdbID"
        crossOrigin="anonymous"
        v-if="movie.Poster"
        height="360px"
        :src="movie.Poster"
        @load="getColor()"
      />
    </v-card-subtitle>
    <v-card-subtitle>
      {{ movie.Year }} &nbsp;&middot;&nbsp;
      {{ movie.Rated }} &nbsp;&middot;&nbsp;
      {{ movie.Runtime }}
    </v-card-subtitle>
    <v-card-text align="left">
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
      <v-card v-if="movie.Awards && movie.Awards !== 'N/A'" light>
        <v-card-text>
          <v-icon color="primary">mdi-medal</v-icon>
          {{ movie.Awards }}
        </v-card-text>
      </v-card>
      <v-row v-if="movie.Plot">
        <v-col>{{ movie.Plot }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-if="movie.Director">
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
      <v-divider></v-divider>
      <v-row v-if="movie.Writer">
        <v-col cols="2" class="strong--text">
          <template v-if="movie.Writer.split(',').length > 1">Writers</template>
          <template v-if="movie.Writer.split(',').length === 1"
            >Writer</template
          >
        </v-col>
        <v-col cols="10">{{ movie.Writer }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-if="movie.Actors">
        <v-col cols="2" class="strong--text">Stars</v-col>
        <v-col cols="10">{{ movie.Actors }}</v-col>
      </v-row>
      <v-divider></v-divider>
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

    getColor() {
      // TODO: Import colorThief as an npm package
      let img = document.querySelector(`img[dataid="${this.movie.imdbID}"]`);
      // Make sure image is finished loading
      let color = window.colorThief.getColor(img);
      this.$refs.imagesubtitle.style.height = "360px";
      this.$refs.imagesubtitle.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    },

    getRatingValue(rating, stars) {
      // TODO: replace eval()
      return stars * eval(rating.replace("%", "/100"));
    },

    close() {
      this.$emit("change", false);
    }
  }
};
</script>
