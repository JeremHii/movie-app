<template>
  <div v-if="movie">
    <div v-if="showPreview">
      <Banner text="Fermer la prévisualisation" @click="showPreview = false" />
      <MovieView :force-movie="movie" class="dark:bg-zinc-900" />
    </div>
    <div
      v-show="!showPreview"
      class="mx-auto w-11/12 sm:w-5/6 md:w-4/5 lg:w-2/3 xl:w-1/2 mt-8"
    >
      <div class="w-fit mx-auto">
        <Label text="Prévisualisation" class="mb-2" />
        <MovieCard :movie="movie" :link="false" />
        <div class="flex flex-col mt-2 space-y-2">
          <Button
            class="w-full"
            @click="showPreview = true"
            text="Prévisualiser la page entière"
          />
          <RouterLink
            class="w-full"
            :to="
              movie.id
                ? { name: 'movieDetails', params: { id: movie.id } }
                : { name: 'home' }
            "
          >
            <Button
              class="w-full"
              theme="gray"
              :text="
                movie.id
                  ? `Retourner à l'affiche du film`
                  : 'Retourner à la liste'
              "
            />
          </RouterLink>
        </div>
      </div>
      <MovieForm
        class="py-4"
        v-model:movie="movie"
        @save="save"
        @cancel="movie = savedMovie"
        :has-changed="!_.isEqual(movie, savedMovie, { deep: true })"
        v-model:is-valid="isValid"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref, watch } from "vue";
import { Movie } from "@/models/Movie";
import { Api } from "@/services/api/Api";
import MovieForm from "@/components/forms/MovieForm.vue";
import MovieCard from "@/components/cards/MovieCard.vue";
import Label from "@/components/generic/form/Label.vue";
import MovieView from "@/views/movie/MovieView.vue";
import Button from "@/components/generic/Button.vue";
import Banner from "@/components/generic/Banner.vue";
import { MovieApi } from "@/services/api/MovieApi";
import _ from "lodash";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const movie = ref<Movie | null>(null);
const savedMovie = ref<Movie | null>(null);
const isValid = ref<boolean>(false);
const toast = useToast();

onBeforeMount(async () => {
  if (!route.params.id) return;
  movie.value = await Api.Movie.getOne(route.params.id);
  savedMovie.value = _.clone(movie.value, { deep: true });
  if (movie.value === null) {
    router.push({ name: "movies" });
    return;
  }
});

const save = async () => {
  if (!movie.value || !isValid.value) return;
  if (movie.value?.id) {
    const res = await MovieApi.update(movie.value.id, movie.value);
    if (res) {
      movie.value = res;
      savedMovie.value = _.clone(movie.value);
      toast.success("Les modifications ont été enregistrées.");
    }
  }
};

const showPreview = ref(false);
</script>
