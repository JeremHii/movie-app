<template>
  <RouterLink :to="{ name: 'movieNew' }">
    <IconButton class="fixed right-2 mt-2 z-40" :icon="PlusCircleIcon" />
  </RouterLink>
  <MovieGallery class="justify-center" :movies="movies" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Movie } from "@/models/Movie";
import { Api } from "@/services/api/Api";
import MovieGallery from "@/components/generic/MovieGallery.vue";
import IconButton from "@/components/generic/IconButton.vue";
import { PlusCircleIcon } from "@heroicons/vue/20/solid";

const movies = ref<Movie[]>([]);

onBeforeMount(async () => {
  movies.value = await Api.Movie.getAll();
});
</script>
