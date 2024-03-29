<template>
  <div v-if="movie" class="flex flex-col">
    <MovieBanner :movie="movie" @delete="onAskDelete" />
    <div class="px-8 md:px-16 lg:px-40 py-4">
      <BigDirectorCard v-if="movie.director" :director="movie.director" />
    </div>
    <ConfirmCancelModal v-model:open="isModalOpen" @confirm="onConfirmDelete" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref, watch } from "vue";
import { Api } from "@/services/api/Api";
import { Movie } from "@/models/Movie";
import BigDirectorCard from "@/components/cards/BigDirectorCard.vue";
import MovieBanner from "@/components/viewsRelated/movie/MovieBanner.vue";
import ConfirmCancelModal from "@/components/modals/ConfirmCancelModal.vue";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();
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
  if (!route.params.id || typeof route.params.id !== "string") return;
  movie.value = await Api.Movie.getOne(parseInt(route.params.id));
  if (movie.value === null) {
    await router.push({ name: "home" });
    return;
  }
};

const isModalOpen = ref(false);

const onAskDelete = () => {
  if (props.forceMovie) return;
  isModalOpen.value = true;
};

const onConfirmDelete = async () => {
  if (!movie.value?.id) return;
  const deleted = await Api.Movie.delete(movie.value.id);
  if (deleted) {
    toast.success("Le film a bien été supprimé.");
    await router.push({ name: "home" });
  }
};
</script>
