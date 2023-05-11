<template>
  <div class="relative py-4 w-full">
    <div class="absolute top-0 w-full h-full z-0 max-h-full flex">
      <div class="absolute top-0 w-full h-full z-10 opacity-40 bg-black"></div>
      <div class="w-full" :style="dominantBackgroundStyles"></div>
    </div>
    <div
      class="w-full sm:px-8 md:px-16 lg:px-40 flex text-white flex-col sm:flex-row items-center sm:items-start"
    >
      <img
        :src="props.director.getPicture()"
        crossorigin=""
        ref="img"
        class="rounded-lg max-h-72 xs:max-h-80 sm:max-h-[35rem] md:max-h-full w-48 md:w-64 lg:w-[20rem] object-cover z-50"
      />
      <div class="ml-10 my-auto overflow-x-hidden z-50 p-2">
        <div>
          <span class="font-bold text-3xl md:text-4xl">
            {{ props.director.getFullName() }}
          </span>
        </div>
        <div class="font-thin">
          Né(e) le {{ DateUtils.formatDate(props.director.birthDate) }}
        </div>
        <div class="mt-2">
          <div class="text-xl font-semibold">Nationalité</div>
          <div class="max-h-full lg:max-h-full overflow-hidden w-full">
            {{ props.director.nationality }}
          </div>
        </div>
        <div class="mt-2">
          <div class="text-xl font-semibold">Biographie</div>
          <div class="max-h-full lg:max-h-full overflow-hidden w-full">
            {{ props.director.getBiography() }}
          </div>
        </div>
        <div class="mt-2">
          <RouterLink
            v-if="props.director.id"
            :to="{ name: 'directorEdit', params: { id: props.director.id } }"
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
import { Director } from "@/models/Director";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { computed, ref, watch } from "vue";
import { ImageUtils } from "@/utils/ImageUtils";
import IconButton from "@/components/generic/IconButton.vue";
import {DateUtils} from "@/utils/DateUtils";

const props = defineProps<{ director: Director }>();
const emits = defineEmits<{ (e: "delete"): void }>()
const dominantColor = ref<string>("transparent");
const img = ref();

watch(props, async () => {
  if (!props.director) dominantColor.value = "transparent";
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
</script>
