import { createRouter, createWebHistory } from "vue-router";
import MoviesView from "../views/movie/MoviesView.vue";
import MovieView from "../views/movie/MovieView.vue";
import MovieEditView from "@/views/movie/MovieEditView.vue";
import DirectorsView from "@/views/director/DirectorsView.vue";
import DirectorView from "@/views/director/DirectorView.vue";

const router = createRouter({
  //@ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      children: [
        {
          path: "",
          name: "home",
          component: MoviesView,
        },
        {
          path: "movie/:id",
          children: [
            {
              path: "",
              name: "movieDetails",
              component: MovieView,
            },
            {
              path: "edit",
              name: "movieEdit",
              component: MovieEditView,
            },
          ],
        },
        {
          path: "director",
          children: [
            {
              path: "",
              name: "directors",
              component: DirectorsView,
            },
            {
              path: ":id",
              children: [
                {
                  path: "",
                  name: "directorDetails",
                  component: DirectorView,
                },
                {
                  path: "edit",
                  name: "directorEdit",
                  component: MovieEditView,
                },
              ],
            },
          ],
        },
        {
          path: "genre",
          children: [
            {
              path: "",
              name: "genres",
              component: MoviesView,
            },
            {
              path: ":id",
              children: [
                {
                  path: "",
                  name: "genreDetails",
                  component: MovieView,
                },
                {
                  path: "edit",
                  name: "genreEdit",
                  component: MovieEditView,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

export default router;
