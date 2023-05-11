<template>
  <div class="relative py-4 w-full">
    <div class="absolute top-0 w-full h-full z-0 max-h-full flex">
      <div class="absolute top-0 w-full h-full z-10 opacity-40 bg-black"></div>
      <div
        class="w-0 sm:w-1/3 lg:w-1/4 xl:w-1/5"
        :style="dominantBackgroundStyles"
      ></div>
      <div class="relative flex-1 select-none">
        <img
          :src="props.movie.background || ''"
          crossorigin=""
          ref="img"
          class="object-cover w-full h-full"
        />
        <div
          class="absolute top-0 w-full h-full"
          :style="transitionColorStyles"
        ></div>
      </div>
    </div>
    <div
      class="w-full sm:px-8 md:px-16 lg:px-40 flex text-white flex-col sm:flex-row items-center sm:items-start"
    >
      <img
        :src="props.movie.getPoster()"
        class="rounded-lg max-h-72 xs:max-h-80 sm:max-h-[35rem] md:max-h-full w-48 sm:w-80 md:w-96 lg:w-[35rem] object-cover z-50"
      />
      <div class="ml-10 my-auto overflow-x-hidden z-50 p-2">
        <div>
          <span class="font-bold text-3xl md:text-4xl">
            {{ props.movie.getTitle() }}
          </span>
          <span class="text-3xl text-gray-200">
            ({{ props.movie.releaseDate.getFullYear() }})
          </span>
        </div>
        <div class="font-thin">
          {{ DateUtils.formatDate(props.movie.releaseDate) }} -
          {{ props.movie.genres.map((genre) => genre.name).join(", ") }}
        </div>
        <div class="mt-2">
          <div class="text-xl font-semibold">Synopsis</div>
          <div class="max-h-full lg:max-h-full overflow-hidden w-full">
            {{ props.movie.getSynopsis() }}
          </div>
        </div>
        <div class="mt-2">
          <RouterLink
            v-if="movie.id"
            :to="{ name: 'movieEdit', params: { id: movie.id } }"
          >
            <IconButton
              :icon="PencilIcon"
              :style="dominantBackgroundStyles"
              class="relative group focus:ring-0"
            >
              <div
                class="absolute w-full h-full bg-black group-hover:opacity-30 opacity-20 transition-opacity left-0 rounded-lg"
              ></div>
            </IconButton>
          </RouterLink>
          <IconButton :icon="TrashIcon" theme="error" class="ml-2" @click="emits('delete')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Movie } from "@/models/Movie";
import { ImageUtils } from "@/utils/ImageUtils";
import IconButton from "@/components/generic/IconButton.vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { DateUtils } from "../../../utils/DateUtils";

const dominantColor = ref<string>("transparent");

const props = defineProps<{ movie: Movie }>();
const emits = defineEmits<{ (e: "delete"): void }>()
const img = ref();

watch(props, async () => {
  if (!props.movie) dominantColor.value = "transparent";
  else if (img.value) {
    img.value.setAttribute("crossorigin", "anonymous");
    dominantColor.value = await ImageUtils.getDominantColor(img.value);
  }
});

watch(img, async () => {
  img.value.addEventListener("load", imgLoaded);
  img.value.addEventListener("error", imgError);
  if (img.value.complete) await imgCheck();
});

const imgCheck = async () => {
  if (img.value.naturalWidth > 10) await imgLoaded();
  else imgError();
};

const imgLoaded = async () => {
  dominantColor.value = await ImageUtils.getDominantColor(img.value);
};

const imgError = () => {
  img.value.removeAttribute("crossorigin");
  dominantColor.value = "#212";
};

const dominantBackgroundStyles = computed(() => {
  return {
    backgroundColor: dominantColor.value,
  };
});

const transitionColorStyles = computed(() => {
  return {
    backgroundImage: `linear-gradient(to left, transparent 60%, ${dominantColor.value})`,
  };
});
</script>
