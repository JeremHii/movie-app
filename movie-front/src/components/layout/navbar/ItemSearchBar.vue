<template>
  <div class="relative z-[60]">
    <SearchBar
      :model-value="query"
      @update:model-value="(e) => emits('update:query', e)"
      place-holder="Chercher sur le site..."
    />
    <div
      v-if="
        props.items.directors.length > 0 ||
        props.items.genres.length > 0 ||
        props.items.movies.length > 0
      "
      class="absolute bg-white dark:bg-zinc-800 dark:text-white rounded-t-lg drop-shadow-md mt-2 min-w-full z-40 max-w-sm right-0"
    >
      <div class="w-full">
        <div>
          <div class="bg-zinc-700 px-2 py-1 rounded-t-lg font-bold">Films</div>
          <div v-if="props.items.movies.length > 0">
            <MovieSearchCard
              v-for="movie in props.items.movies.slice(0, 10)"
              :key="movie.id"
              :movie="movie"
            />
          </div>
          <div class="px-2 py-1" v-else>Aucun film trouvé</div>
        </div>

        <div>
          <div class="bg-zinc-700 px-2 py-1 font-bold">Réalisateurs</div>
          <div v-if="props.items.directors.length > 0">
            <DirectorSearchCard
              v-for="director in props.items.directors.slice(0, 10)"
              :key="director.id"
              :director="director"
            />
          </div>
          <div class="px-2 py-1" v-else>Aucun réalisateur trouvé</div>
        </div>

        <div>
          <div class="bg-zinc-700 px-2 py-1 font-bold">Genres</div>
          <div v-if="props.items.genres.length > 0">
            <GenreSearchCard
              v-for="genre in props.items.genres.slice(0, 10)"
              :key="genre.id"
              :genre="genre"
            />
          </div>
          <div class="px-2 py-1" v-else>Aucun genre trouvé</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from "@/components/generic/SearchBar.vue";
import MovieSearchCard from "@/components/layout/navbar/MovieSearchCard.vue";
import type { ItemsType } from "@/utils/ItemsType";
import DirectorSearchCard from "@/components/layout/navbar/DirectorSearchCard.vue";
import GenreSearchCard from "@/components/layout/navbar/GenreSearchCard.vue";

const props = defineProps<{ query: string; items: ItemsType }>();
const emits = defineEmits<{ (e: "update:query", value: string): void }>();
</script>
