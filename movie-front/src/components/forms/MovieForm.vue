<template>
  <div>
    <TextInput
      label="Titre"
      :model-value="props.movie.title"
      required
      @update:model-value="(e) => updateAttribute('title', e)"
    />
    <TextAreaInput
      class="mt-2"
      label="Synopsis"
      :rows="5"
      :model-value="props.movie.synopsis"
      @update:model-value="(e) => updateAttribute('synopsis', e)"
    />
    <TextInput
      class="mt-2"
      label="Poster"
      :model-value="props.movie.poster"
      @update:model-value="(e) => updateAttribute('poster', e)"
    />
    <TextInput
      class="mt-2"
      label="Image de fond"
      :model-value="props.movie.background"
      @update:model-value="(e) => updateAttribute('background', e)"
    />
    <div class="flex w-full mt-2 space-x-4">
      <TextInput
        class="flex-1"
        label="Langue"
        required
        :model-value="props.movie.lang"
        @update:model-value="(e) => updateAttribute('lang', e)"
      />
      <TextInput
        class="mt-auto"
        :disabled="true"
        :model-value="props.movie.getLanguageName()"
      />
    </div>

    <div class="flex space-x-4 mt-2">
      <ComboBox
        label="Genres"
        displayed-attribute="name"
        class="flex-1"
        :filter="
          (query, item) =>
            item.name.trim().toLowerCase().includes(query.trim().toLowerCase())
        "
        :items="genres"
        multiple
        :selected="genres.filter((genre) => _.some(props.movie.genres, genre))"
        @update:selected="
          (e) =>
            updateAttribute(
              'genres',
              e.sort((a, b) => (a.id > b.id ? 1 : -1))
            )
        "
      />
      <RouterLink
        :to="{
          name: 'genres',
        }"
        class="mt-auto"
      >
        <IconButton :icon="ArrowRightIcon" />
      </RouterLink>
    </div>

    <div class="flex space-x-4 mt-2">
      <ComboBox
        label="Réalisateur"
        displayed-attribute="getFullName"
        class="flex-1"
        :filter="
          (query, item) =>
            item
              .getFullName()
              .trim()
              .toLowerCase()
              .includes(query.trim().toLowerCase())
        "
        :items="directors"
        required
        :selected="
          directors.find((director) => director.id === props.movie.director.id)
        "
        @update:selected="(e) => updateAttribute('director', e)"
      >
        <template #option="{ item }">
          <div class="flex items-center space-x-2">
            <img
              v-lazy="item.getPicture()"
              class="w-8 h-8 object-cover rounded-full"
            />
            <div>
              {{ item.getFullName() }}
            </div>
          </div>
        </template>
      </ComboBox>
      <RouterLink
        :to="{
          name: 'directorDetails',
          params: { id: props.movie.director.id },
        }"
        class="mt-auto"
        v-if="props.movie.director"
      >
        <IconButton :icon="ArrowRightIcon" />
      </RouterLink>
    </div>
    <TextInput
      class="mt-2"
      label="Date de sortie"
      type="date"
      :model-value="props.movie.releaseDate"
      @update:model-value="(e) => updateAttribute('releaseDate', e)"
      required
    />
    <div class="flex mt-6 space-x-6">
      <Button
        text="Sauvegarder"
        class="w-full"
        @click="emits('save')"
        :disabled="!hasChanged || !props.isValid"
      />
      <Button
        text="Annuler les changements"
        class="w-full"
        @click="emits('cancel')"
        theme="error"
        :disabled="!hasChanged"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Movie } from "@/models/Movie";
import TextInput from "@/components/generic/form/TextInput.vue";
import { onBeforeMount, ref, watch } from "vue";
import TextAreaInput from "@/components/generic/form/TextAreaInput.vue";
import ComboBox from "@/components/generic/form/ComboBox.vue";
import Button from "@/components/generic/button.vue";
import { Genre } from "@/models/Genre";
import { Director } from "@/models/Director";
import { Api } from "@/services/api/Api";
import _ from "lodash";
import IconButton from "@/components/generic/IconButton.vue";
import { ArrowRightIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  movie: Movie;
  hasChanged: boolean;
  isValid: boolean;
}>();
const emits = defineEmits<{
  (e: "update:movie", movie: Movie): void;
  (e: "update:isValid", isValid: boolean): void;
  (e: "save"): void;
  (e: "cancel"): void;
}>();

const genres = ref<Genre[]>([]);
const directors = ref<Director[]>([]);

onBeforeMount(async () => {
  genres.value = await Api.Genre.getAll();
  directors.value = await Api.Director.getAll();
});

const updateAttribute = (attribute: string, value: any) => {
  const newMovie: Movie = _.clone(props.movie);
  newMovie[attribute] = value;
  emits("update:movie", newMovie);
};

watch(props, () => {
  const isValid: boolean =
    props.movie.title.trim() !== "" &&
    props.movie.lang.trim() !== "" &&
    props.movie.director !== undefined &&
    !isNaN(props.movie.releaseDate.getTime());
  emits("update:isValid", isValid);
});
</script>
