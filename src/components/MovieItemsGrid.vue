<template>
  <v-container fluid class="pa-0">
    <v-data-iterator
      :items="movies"
      :loading="loading"
      disable-filtering
      disable-pagination
      disable-sort
      fixed-header
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            label="Search Titles"
            class="mt-10 mb-5 shrink"
            append-icon="mdi-magnify"
            clear-icon="mdi-close"
            clearable
          ></v-text-field>
          <v-select
            class="mt-10 mb-5 shrink pl-5"
            v-model="typeFilter"
            :items="movieTypes"
            label="Type"
            clearable
          ></v-select>
          <v-dialog
            scrollable
            v-model="dialog"
            max-width="640px"
            :hide-overlay="$vuetify.breakpoint.mdAndDown"
            :fullscreen="$vuetify.breakpoint.mdAndDown"
          >
            <movie-details
              v-model="dialog"
              :movie-id="selectedItem.imdbID"
            ></movie-details>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row class="px-4">
          <v-col
            v-for="item in props.items"
            :key="item.imdbID"
            cols="12"
            sm="6"
            md="4"
            lg="2"
            @click.stop="viewMovie(item)"
          >
            <movie-item :movie="item"></movie-item>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <div id="loader">&nbsp;</div>
  </v-container>
</template>

<script>
import MovieService from "../services/MovieService";
import MovieItem from "./MovieItem.vue";
import MovieDetails from "./MovieDetails";

export default {
  components: { MovieItem, MovieDetails },
  props: {
    showDialog: Boolean
  },

  data: () => ({
    dialog: false,
    typeFilter: "",
    search: "",
    loading: false,
    movies: [],
    totalMovies: 0,
    currentPage: 1,
    selectedId: null,
    selectedItem: {
      Title: "",
      Year: "",
      imdbID: null,
      Type: "",
      Poster: ""
    },
    defaultItem: {
      Title: "",
      Year: "",
      imdbID: null,
      Type: "",
      Poster: ""
    },
    movieTypes: [
      { value: "movie", text: "Movies" },
      { value: "series", text: "Series" },
      { value: "episode", text: "Episodes" }
    ]
  }),

  watch: {
    showDialog(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) {
        this.close();
      }
      this.$emit("input", val);
    },
    search() {
      this.getMovies();
    },
    typeFilter() {
      this.getMovies();
    }
  },

  mounted() {
    this.initialize();
    this.setupInfiniteScroll();
  },

  methods: {
    initialize() {
      this.getMovies();
    },

    async getMovies() {
      this.loading = true;
      this.currentPage = 1;
      if (this.search) {
        let response = await MovieService.getMovies(
          this.search,
          this.typeFilter,
          1
        );
        this.movies = response.data.Search;
        this.totalMovies = parseInt(response.data.totalResults);
        this.loading = false;
      } else {
        this.movies = [];
        this.loading = false;
      }
    },

    async loadNextPage() {
      this.loading = true;
      if (this.search && this.movies.length < this.totalMovies) {
        this.currentPage++;
        let response = await MovieService.getMovies(
          this.search,
          this.typeFilter,
          this.currentPage
        );
        this.movies = this.movies.concat(response.data.Search);
        this.loading = false;
      } else {
        this.loading = false;
      }
    },

    viewMovie(item) {
      this.selectedId = item.imdbID;
      this.selectedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.selectedItem = Object.assign({}, this.defaultItem);
        this.selectedId = null;
      }, 300);
    },

    setupInfiniteScroll() {
      this.observer = new IntersectionObserver(this.loadNextPage, {
        root: null,
        rootMargin: "0px",
        threshold: 0.25
      });
      this.observer.observe(document.querySelector("#loader"));
    }
  }
};
</script>
