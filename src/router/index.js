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
    component: MovieItemsGrid,
    props: {
      type: "movie"
    }
  },
  {
    path: "/series",
    name: "series",
    component: MovieItemsGrid,
    props: {
      type: "series"
    }
  },
  {
    path: "/games",
    name: "games",
    component: MovieItemsGrid,
    props: {
      type: "game"
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
