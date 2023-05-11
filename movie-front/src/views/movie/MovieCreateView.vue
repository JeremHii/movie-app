<template>
  <MovieCreateEdit v-model:movie="movie" :is-new="true" @save="save"/>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Movie } from "@/models/Movie";
import { Api } from "@/services/api/Api";
import { useToast } from "vue-toastification";
import MovieCreateEdit from "@/components/viewsRelated/movie/MovieCreateEdit.vue";

const router = useRouter();
const movie = ref<Movie>(new Movie({title: "", lang: "en", releaseDate: new Date()}));
const toast = useToast();

const save = async () => {
  const res = await Api.Movie.create(movie.value);
  if (res) {
    movie.value = res;
    toast.success("Le film a été créé.");
    await router.push({name: 'movieDetails', params: {id: movie.value.id}})
  }
};
</script>
