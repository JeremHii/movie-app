<template>
  <MovieCreateEdit v-if="movie" v-model:movie="movie" :saved-movie="savedMovie" :is-new="false" @save="save"/>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { Movie } from "@/models/Movie";
import { Api } from "@/services/api/Api";
import { MovieApi } from "@/services/api/MovieApi";
import _ from "lodash";
import { useToast } from "vue-toastification";
import MovieCreateEdit from "@/components/viewsRelated/movie/MovieCreateEdit.vue";

const route = useRoute();
const router = useRouter();
const movie = ref<Movie | null>(null);
const savedMovie = ref<Movie | null>(null);
const toast = useToast();

onBeforeMount(async () => {
  if (!route.params.id) return;
  movie.value = await Api.Movie.getOne(route.params.id);
  savedMovie.value = _.clone(movie.value, { deep: true });
  if (movie.value === null) {
    router.push({ name: "movies" });
    return;
  }
});

const save = async () => {
  const res = await MovieApi.update(movie.value.id, movie.value);
  if (res) {
    movie.value = res;
    savedMovie.value = _.clone(movie.value);
    toast.success("Les modifications ont été enregistrées.");
  }
};
</script>
