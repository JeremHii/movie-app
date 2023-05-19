<template>
  <div v-if="movie">
    <EntityCreateEdit list-path-name="home" back-to-entity="Retourner à l'affiche du film" entity-path-name="movieDetails" :is-new="props.isNew" :entity="movie">
      <template #preview>
        <MovieView :force-movie="movie" class="dark:bg-zinc-900" />
      </template>
      <template #smallPreview>
        <MovieCard :movie="movie" :link="false" />
      </template>
      <template #form>
        <MovieForm
            class="py-4"
            :movie="movie"
            @update:movie="e => emits('update:movie', e)"
            @save="onSave"
            @cancel="emits('update:movie', savedMovie)"
            :has-changed="isNew || !_.isEqual(movie, savedMovie, { deep: true })"
            v-model:is-valid="isValid"
        />
      </template>
    </EntityCreateEdit>
  </div>
</template>

<script setup lang="ts">
import {Movie} from "@/models/Movie";
import MovieForm from "@/components/forms/MovieForm.vue";
import MovieCard from "@/components/cards/MovieCard.vue";
import MovieView from "@/views/movie/MovieView.vue";
import _ from "lodash";
import {ref} from "vue";
import EntityCreateEdit from "@/components/generic/EntityCreateEdit.vue";

const props = defineProps<{movie: Movie, savedMovie?: Movie, isNew: boolean}>()
const emits = defineEmits<{(e: "update:movie", movie: Movie): void, (e: 'save'): void}>()
const isValid = ref(false)

const onSave = () => {
  if(isValid.value) emits('save')
}
</script>