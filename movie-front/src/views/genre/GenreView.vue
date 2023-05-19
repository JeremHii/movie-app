<template>
  <div v-if="genre && savedGenre" class="flex flex-col">
    <GenreBanner :genre="genre" @delete="onAskDelete" @edit="onAskEdit" />
    <div class="px-8 md:px-16 lg:px-40 py-4" v-if="genre.movies.length > 0">
      <div class="text-xl dark:text-white font-semibold">Films liés au genre ({{genre.movies.length}})</div>
      <MovieGallery :movies="genre.movies" />
    </div>
    <ConfirmCancelModal v-model:open="isDeleteModalOpen" @confirm="onConfirmDelete"/>
    <ConfirmCancelModal v-model:open="isEditModalOpen" @close="onCancelEdit" button-confirm-theme="normal" @confirm="onConfirmEdit">
      <GenreForm :has-changed="!_.isEqual(genre, savedGenre, { deep: true })" v-model:is-valid="isValid" v-model:genre="genre">
        <template #buttons="{ canSave }">
          <div class="mt-4 flex">
            <Button :disabled="!canSave" text="Confirmer" @click="onConfirmEdit"/>
            <Button  theme="gray" text="Annuler" class="ml-1" @click="onCancelEdit"/>
          </div>
        </template>
      </GenreForm>
      <template #buttons><div/></template>
    </ConfirmCancelModal>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref, watch } from "vue";
import { Api } from "@/services/api/Api";
import ConfirmCancelModal from "@/components/modals/ConfirmCancelModal.vue";
import {useToast} from "vue-toastification";
import MovieGallery from "@/components/generic/MovieGallery.vue";
import {Genre} from "@/models/Genre";
import GenreBanner from "@/components/viewsRelated/genre/GenreBanner.vue";
import _ from "lodash";
import GenreForm from "@/components/forms/GenreForm.vue";
import Button from "@/components/generic/Button.vue";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const genre = ref<Genre | null>(null);
const savedGenre = ref<Genre | null>(null)

onBeforeMount(async () => await loadGenre());

watch(router.currentRoute, async () => {
  await loadGenre();
});

const loadGenre = async () => {
  if (!route.params.id) return;
  genre.value = await Api.Genre.getOne(route.params.id);
  if (genre.value === null) {
    await router.push({ name: "genres" });
    return;
  }
  savedGenre.value = _.cloneDeep(genre.value)
};

const isDeleteModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isValid = ref(false)

const onAskDelete = () => {
  isDeleteModalOpen.value = true
}

const onConfirmDelete = async () => {
  if(!genre.value?.id) return
  const deleted = await Api.Genre.delete(genre.value.id)
  if(deleted){
    toast.success("Le genre a bien été supprimé.")
    await router.push({name: 'genres'})
  }
}

const onCancelEdit = () => {
  if(!genre.value || !savedGenre.value) return
  genre.value = savedGenre.value

  isEditModalOpen.value = false
}

const onAskEdit = () => {
  if(!genre.value || !savedGenre.value) return
  genre.value.name = savedGenre.value.name
  isEditModalOpen.value = true
}

const onConfirmEdit = async () => {
  if(!genre.value || !savedGenre.value || !isValid.value) return
  const res = await Api.Genre.update(genre.value.id, genre.value);
  if (res) {
    genre.value = res;
    savedGenre.value = _.clone(genre.value);
    toast.success("Les modifications ont été enregistrées.");
    isEditModalOpen.value = false
  }
}
</script>
