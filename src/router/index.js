import Vue from "vue";
import VueRouter from "vue-router";
import MovieItemsGrid from "../components/MovieItemsGrid";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/movies"
  },
  {
    path: "/movies",
    name: "movies",
    component: MovieItemsGrid
  },
  {
    path: "/movies/:searchText",
    name: "movie-search",
    component: MovieItemsGrid,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
