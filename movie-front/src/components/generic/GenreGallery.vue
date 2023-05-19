<template>
  <div class="flex flex-wrap xl:w-1/2 mx-auto">
    <GenreCard
      class="m-1"
      v-for="genre in genres"
      :key="genre.id"
      :genre="genre"
    />
  </div>
</template>

<script setup lang="ts">
import GenreCard from "@/components/cards/GenreCard.vue";
import { Genre } from "@/models/Genre";

const props = defineProps<{ genres: Genre[] }>();

</script>
