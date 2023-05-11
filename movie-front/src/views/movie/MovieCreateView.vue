<template>
  <MovieCreateEdit v-if="movie" v-model:movie="movie" :is-new="true" @save="save"/>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { Movie } from "@/models/Movie";
import { Api } from "@/services/api/Api";
import { MovieApi } from "@/services/api/MovieApi";
import _ from "lodash";
import { useToast } from "vue-toastification";
import MovieCreateEdit from "@/components/viewsRelated/movie/MovieCreateEdit.vue";

const route = useRoute();
const router = useRouter();
const movie = ref<Movie>(new Movie({title: "", lang: "en", releaseDate: new Date()}));
const toast = useToast();

const save = async () => {
  const res = await MovieApi.create(movie.value);
  if (res) {
    movie.value = res;
    toast.success("Le film a été créé.");
    await router.push({name: 'movieDetails', params: {id: movie.value.id}})
  }
};
</script>
