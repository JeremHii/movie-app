<template>
  <div v-if="director" class="flex flex-col">
    <DirectorBanner :director="director" />
    <div class="px-8 md:px-16 lg:px-40 py-4">
      <div class="text-xl dark:text-white font-semibold">Films réalisés</div>
      <MovieGallery :movies="director.movies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref, watch } from "vue";
import { Api } from "@/services/api/Api";
import { Director } from "@/models/Director";
import MovieGallery from "@/components/generic/MovieGallery.vue";
import DirectorBanner from "@/components/viewsRelated/director/DirectorBanner.vue";

const route = useRoute();
const router = useRouter();
const director = ref<Director | null>(null);

const props = defineProps<{ forceDirector?: Director }>();
onBeforeMount(async () => await loadDirector());

watch(router.currentRoute, async () => {
  await loadDirector();
});

const loadDirector = async () => {
  if (props.forceDirector) {
    director.value = props.forceDirector;
    return;
  }
  if (!route.params.id) return;
  director.value = await Api.Director.getOne(route.params.id);
  if (director.value === null) {
    await router.push({ name: "movies" });
    return;
  }
};

watch(props, () => {
  director.value = props.forceDirector || null;
});
</script>
