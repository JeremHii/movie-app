<template>
  <RouterLink :to="{ name: 'movieDetails', params: { id: props.movie.id } }">
    <SearchCard>
      {{ props.movie.getTitle() }}
    </SearchCard>
  </RouterLink>
</template>

<script setup lang="ts">
import { Movie } from "@/models/Movie";
import SearchCard from "@/components/layout/navbar/SearchCard.vue";

const props = defineProps<{ movie: Movie }>();
</script>
