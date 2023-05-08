<template>
  <MovieGallery class="justify-center" :movies="movies" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Movie } from "@/models/Movie";
import { Api } from "@/services/api/Api";
import MovieGallery from "@/components/generic/MovieGallery.vue";

const movies = ref<Movie[]>([]);

onBeforeMount(async () => {
  movies.value = await Api.Movie.getAll();
});
</script>
