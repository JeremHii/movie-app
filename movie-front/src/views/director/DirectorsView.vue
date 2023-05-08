<template>
  <DirectorGallery :directors="directors" class="justify-center space-x-2" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Api } from "@/services/api/Api";
import { Director } from "@/models/Director";
import DirectorGallery from "@/components/generic/DirectorGallery.vue";

const directors = ref<Director[]>([]);

onBeforeMount(async () => {
  directors.value = await Api.Director.getAll();
});
</script>
