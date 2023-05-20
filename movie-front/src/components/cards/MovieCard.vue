<template>
  <RouterLink
    :to="
      link === false
        ? '#'
        : { name: 'movieDetails', params: { id: props.movie.id } }
    "
  >
    <div
      class="w-56 transition-all h-96 rounded-lg relative group overflow-y-hidden max-h-fit select-none"
    >
      <img
        class="w-full h-full rounded-lg object-cover"
        v-lazy="props.movie.getPoster()"
        alt="Movie poster"
      />
      <div
        class="absolute w-full h-full top-0 rounded-lg bg-gradient-to-b from-transparent group-hover:from-black/40 to-black group-hover:to-black transition-all"
      ></div>
      <div
        class="p-2 absolute -translate-y-[2.4rem] group-hover:-translate-y-full transition-all w-56"
      >
        <div
          class="font-bold text-white group-hover:w-full truncate group-hover:whitespace-normal"
        >
          {{ props.movie.getTitle() }}
        </div>
        <div class="group-hover:visible mt-2">
          <div class="flex items-center">
            <img
              v-if="props.movie.director"
              :src="props.movie.director.getPicture()"
              class="mr-2 h-8 w-8 rounded-full object-cover"
              alt="Director picture"
            />
            <div class="text-amber-400 truncate">
              {{
                props.movie.director ? props.movie.director.getFullName() : ""
              }}
            </div>
          </div>

          <div class="mt-1 flex flex-wrap space-x-1">
            <Badge
              :content="props.movie.releaseDate.getFullYear()"
              class="bg-gray-800"
            />
            <Badge
              :content="props.movie.getLanguageName()"
              class="bg-blue-500 first-letter:uppercase"
            />
          </div>
          <div class="mt-1 flex flex-wrap">
            <Badge
              v-for="genre in props.movie.genres"
              :key="genre.id"
              :content="genre.name"
              class="bg-yellow-400 first-letter:uppercase mb-1 mr-1"
            />
          </div>
          <div class="text-gray-200 text-clip text-sm mt-1 line-clamp-6">
            {{ props.movie.getSynopsis() }}
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Movie } from "@/models/Movie";
import Badge from "@/components/generic/Badge.vue";

const props = withDefaults(defineProps<{ movie: Movie; link?: boolean }>(), {
  link: true,
});
</script>
