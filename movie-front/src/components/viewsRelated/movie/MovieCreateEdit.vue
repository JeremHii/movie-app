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
              props.isNew
                ? { name: 'home' }
                : { name: 'movieDetails', params: { id: movie.id } }
            "
          >
            <Button
                class="w-full"
                theme="gray"
                :text="
                props.isNew
                  ? 'Retourner à la liste'
                  : `Retourner à l'affiche du film`
              "
            />
          </RouterLink>
        </div>
      </div>
      <MovieForm
          class="py-4"
          :movie="movie"
          @update:movie="e => emits('update:movie', e)"
          @save="onSave"
          @cancel="movie = savedMovie"
          :has-changed="isNew || !_.isEqual(movie, savedMovie, { deep: true })"
          v-model:is-valid="isValid"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {Movie} from "@/models/Movie";
import Button from "@/components/generic/Button.vue";
import MovieForm from "@/components/forms/MovieForm.vue";
import MovieCard from "@/components/cards/MovieCard.vue";
import Label from "@/components/generic/form/Label.vue";
import Banner from "@/components/generic/Banner.vue";
import MovieView from "@/views/movie/MovieView.vue";
import _ from "lodash";
import {ref} from "vue";

const props = defineProps<{movie: Movie, savedMovie?: Movie, isNew: boolean}>()
const emits = defineEmits<{(e: "update:movie", movie: Movie): void, (e: 'save'): void}>()
const showPreview = ref(false);
const isValid = ref(false)

const onSave = () => {
  if(isValid.value) emits('save')
}
</script>