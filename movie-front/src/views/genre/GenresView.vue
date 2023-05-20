<template>
  <IconButton
    class="fixed right-2 mt-2 z-40"
    :icon="PlusCircleIcon"
    @click="isCreateModalOpen = true"
  />
  <GenreGallery class="justify-center" :genres="genres" />
  <ConfirmCancelModal
    title="Nouveau genre"
    v-model:open="isCreateModalOpen"
    button-confirm-theme="normal"
    @confirm="onConfirmCreate"
  >
    <GenreForm
      :has-changed="true"
      v-model:is-valid="isValid"
      v-model:genre="newGenre"
    >
      <template #buttons="{ canSave }">
        <div class="mt-4 flex">
          <Button
            :disabled="!canSave"
            text="Confirmer"
            @click="onConfirmCreate"
          />
          <Button
            theme="gray"
            text="Annuler"
            class="ml-1"
            @click="isCreateModalOpen = false"
          />
        </div>
      </template>
    </GenreForm>
    <template #buttons><div /></template>
  </ConfirmCancelModal>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Api } from "@/services/api/Api";
import IconButton from "@/components/generic/IconButton.vue";
import { PlusCircleIcon } from "@heroicons/vue/20/solid";
import { Genre } from "@/models/Genre";
import GenreGallery from "@/components/generic/GenreGallery.vue";
import ConfirmCancelModal from "@/components/modals/ConfirmCancelModal.vue";
import GenreForm from "@/components/forms/GenreForm.vue";
import Button from "@/components/generic/CustomButton.vue";
import { useToast } from "vue-toastification";

const genres = ref<Genre[]>([]);
const isCreateModalOpen = ref(false);
const isValid = ref(false);
const newGenre = ref<Genre>(new Genre({ name: "" }));
const toast = useToast();

const onConfirmCreate = async () => {
  if (!newGenre.value) return;
  const res = await Api.Genre.create(newGenre.value);
  if (res) {
    toast.success("Le genre a été créé.");
    isCreateModalOpen.value = false;
    await loadGenres();
  }
};

onBeforeMount(async () => {
  await loadGenres();
});

const loadGenres = async () => {
  genres.value = await Api.Genre.getAll();
};
</script>
