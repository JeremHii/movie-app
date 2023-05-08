<template>
  <div v-if="movie" class="flex flex-col">
    <MovieBanner :movie="movie" />
    <div class="px-8 md:px-16 lg:px-40 py-4">
      <BigDirectorCard v-if="movie.director" :director="movie.director" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { computed, onBeforeMount, ref, watch } from "vue";
import { Api } from "@/services/api/Api";
import { Movie } from "@/models/Movie";
import { ImageUtils } from "@/utils/ImageUtils";
import { DateUtils } from "../../utils/DateUtils";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import BigDirectorCard from "@/components/cards/BigDirectorCard.vue";
import IconButton from "@/components/generic/IconButton.vue";
import MovieBanner from "@/components/viewsRelated/movie/MovieBanner.vue";

const route = useRoute();
const router = useRouter();
const movie = ref<Movie | null>(null);

const props = defineProps<{ forceMovie?: Movie }>();

onBeforeMount(async () => await loadMovie());

watch(props, () => {
  movie.value = props.forceMovie || null;
});

watch(router.currentRoute, async () => {
  await loadMovie();
});

const loadMovie = async () => {
  if (props.forceMovie) {
    movie.value = props.forceMovie;
    return;
  }
  if (!route.params.id) return;
  movie.value = await Api.Movie.getOne(route.params.id);
  if (movie.value === null) {
    await router.push({ name: "movies" });
    return;
  }
};
</script>
