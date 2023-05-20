<template>
  <Navbar />
  <Button
    v-if="canPopulate"
    text="Remplir la base de données"
    class="fixed left-2 mt-2 z-40"
    @click="isPopulateModalOpen = true"
    :icon="CircleStackIcon"
  />
  <ConfirmCancelModal
    v-model:open="isPopulateModalOpen"
    title="Remplir la base de données"
    button-confirm-theme="normal"
    @confirm="onConfirmPopulate"
    :button-cancel-disabled="isPopulating"
    :button-confirm-disabled="isPopulating"
    :close-on-confirm="false"
    @update:open="onCloseModal"
  >
    <Range
      v-if="!isPopulating"
      label="Nombre de films à charger"
      v-model:model-value="moviesToLoad"
      :min="20"
      :max="300"
      :step="20"
      showValue
    />
    <div
      v-if="isPopulating"
      class="flex justify-center items-center my-8 space-x-4"
    >
      <Spinner />
      <div class="dark:text-white text-sm">
        Chargement de {{ moviesToLoad }} films dans la base de données.<br />
        Cela peut prendre plusieurs minutes, ne quittez pas la page.
      </div>
    </div>
  </ConfirmCancelModal>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import Navbar from "@/components/layout/navbar/Navbar.vue";
import { initFlowbite } from "flowbite";
import { onBeforeMount, onMounted, ref } from "vue";
import { DarkMode } from "@/utils/DarkMode";
import Button from "@/components/generic/CustomButton.vue";
import { CircleStackIcon } from "@heroicons/vue/20/solid";
import { Api } from "@/services/api/Api";
import Range from "@/components/generic/form/Range.vue";
import ConfirmCancelModal from "@/components/modals/ConfirmCancelModal.vue";
import Spinner from "@/components/generic/Spinner.vue";

const router = useRouter();
const canPopulate = ref<boolean>(false);
const isPopulateModalOpen = ref<boolean>(false);
const moviesToLoad = ref<number | string>(100);
const isPopulating = ref<boolean>(false);

onMounted(async () => {
  initFlowbite();
});

onBeforeMount(async () => {
  DarkMode.init();
});

const onConfirmPopulate = async () => {
  const pageCount = Math.floor(
    (typeof moviesToLoad.value === "string"
      ? parseInt(moviesToLoad.value)
      : moviesToLoad.value) / 20
  );
  isPopulating.value = true;
  const hasPopulated = await Api.Database.populate(pageCount);
  if (hasPopulated) {
    isPopulateModalOpen.value = false;
    await router.go(0);
  }
  isPopulating.value = false;
};

const onCloseModal = () => {
  if (isPopulating.value) {
    isPopulateModalOpen.value = true;
    return;
  }
  isPopulateModalOpen.value = false;
};

router.beforeEach(async () => {
  canPopulate.value = await Api.Database.canPopulate();
});
</script>
