<template>
  <RouterLink :to="{ name: 'genreDetails', params: { id: props.genre.id } }">
    <div
      class="w-48 transition-all rounded-lg p-2 select-none bg-gray-300 hover:bg-gray-400 dark:bg-zinc-800  dark:hover:bg-zinc-800/50"
    >
      <div
        class="font-bold text-black dark:text-white px-2"
      >
        {{ props.genre.name }}
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Genre } from "@/models/Genre";

const props = defineProps<{ genre: Genre }>()
</script>
