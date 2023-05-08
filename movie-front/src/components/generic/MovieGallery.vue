<template>
  <div class="flex flex-wrap">
    <MovieCard
      class="m-1"
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script setup lang="ts">
import { Movie } from "@/models/Movie";
import MovieCard from "@/components/cards/MovieCard.vue";

const props = defineProps<{ movies: Movie[] }>();
</script>
