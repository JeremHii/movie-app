<template>
  <RouterLink :to="{name: 'directorNew'}">
    <IconButton class="fixed right-2 mt-2 z-40" :icon="PlusCircleIcon"/>
  </RouterLink>
  <DirectorGallery :directors="directors" class="justify-center space-x-2" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Api } from "@/services/api/Api";
import { Director } from "@/models/Director";
import DirectorGallery from "@/components/generic/DirectorGallery.vue";
import IconButton from "@/components/generic/IconButton.vue";
import {PlusCircleIcon} from "@heroicons/vue/20/solid";

const directors = ref<Director[]>([]);

onBeforeMount(async () => {
  directors.value = await Api.Director.getAll();
});
</script>
