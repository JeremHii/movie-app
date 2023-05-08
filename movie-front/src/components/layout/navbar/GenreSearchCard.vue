<template>
  <RouterLink :to="{ name: 'genreDetails', params: { id: props.genre.id } }">
    <SearchCard>
      {{ props.genre.name }}
    </SearchCard>
  </RouterLink>
</template>

<script setup lang="ts">
import SearchCard from "@/components/layout/navbar/SearchCard.vue";
import { Genre } from "@/models/Genre";

const props = defineProps<{ genre: Genre }>();
</script>
