<template>
  <v-data-table
    fixed-header
    :headers="headers"
    :items="movies"
    :options.sync="movieOptions"
    :server-items-length="totalMovies"
    :loading="loading"
    :footer-props="footerProps"
    @click:row="viewMovie"
  >
    <template v-slot:top>
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
        <v-spacer></v-spacer>
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
    <!--template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template-->
    <template v-slot:[`item.Poster`]="{ item }">
      <v-img max-height="250" max-width="100" :src="item.Poster"></v-img>
    </template>
  </v-data-table>
</template>

<script>
import MovieDetails from "./MovieDetails";
import MovieService from "../services/MovieService";

export default {
  components: { MovieDetails },
  props: {
    showDialog: Boolean,
    typeName: String
  },

  data: () => ({
    dialog: false,
    typeFilter: "",
    search: "",
    loading: false,
    headers: [
      { text: "", value: "Poster" },
      { text: "Title", value: "Title" },
      { text: "Year", value: "Year" },
      { text: "Type", value: "Type" },
      { text: "", value: "actions", sortable: false, width: 100 }
    ],
    movies: [],
    totalMovies: 0,
    footerProps: {
      disableItemsPerPage: true
    },
    movieOptions: {
      page: 1,
      itemsPerPage: 10
    },
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
    movieOptions() {
      this.getMovies();
    },
    search() {
      this.getMovies();
    },
    typeFilter() {
      this.getMovies();
    }
  },

  activated() {
    if (this.searchText) {
      this.search = this.searchText;
    }
  },

  methods: {
    async getMovies() {
      this.loading = true;
      if (this.search) {
        let response = await MovieService.getMovies(
          this.search,
          this.typeFilter,
          this.movieOptions
        );
        this.movies = response.data.Search;
        this.totalMovies = parseInt(response.data.totalResults);
        this.loading = false;
      } else {
        this.movies = [];
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
    }
  }
};
</script>
