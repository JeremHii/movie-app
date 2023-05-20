import { createRouter, createWebHistory } from "vue-router";
import MoviesView from "../views/movie/MoviesView.vue";
import MovieView from "../views/movie/MovieView.vue";
import MovieEditView from "@/views/movie/MovieEditView.vue";
import MovieCreateView from "@/views/movie/MovieCreateView.vue";
import DirectorsView from "@/views/director/DirectorsView.vue";
import DirectorView from "@/views/director/DirectorView.vue";
import DirectorEditView from "@/views/director/DirectorEditView.vue";
import DirectorCreateView from "@/views/director/DirectorCreateView.vue";
import GenresView from "@/views/genre/GenresView.vue";
import GenreView from "@/views/genre/GenreView.vue";

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
          path: "movie",
          children: [
            {
              path: "new",
              name: "movieNew",
              component: MovieCreateView,
            },
            {
              path: ":id",
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
              path: "new",
              name: "directorNew",
              component: DirectorCreateView,
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
                  component: DirectorEditView,
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
              component: GenresView,
            },
            {
              path: ":id",
              children: [
                {
                  path: "",
                  name: "genreDetails",
                  component: GenreView,
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
