<template>
  <RouterLink
    :to="
      link === false
        ? '#'
        : { name: 'directorDetails', params: { id: props.director.id } }
    "
  >
    <div
      class="w-48 transition-all h-80 rounded-lg relative group overflow-y-hidden max-h-fit select-none"
    >
      <img
        class="w-full h-full rounded-lg object-cover"
        v-lazy="props.director.getPicture()"
      />

      <div
        class="absolute w-full h-full top-0 rounded-lg bg-gradient-to-b from-transparent group-hover:from-black/40 to-black group-hover:to-black transition-all"
      ></div>
      <div
        class="absolute font-bold text-white z-20 bottom-1 w-full px-2 group-hover:bottom-4 transition-all"
      >
        {{ props.director.getFullName() }}
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Director } from "@/models/Director";

const props = withDefaults(
  defineProps<{ director: Director; link?: boolean }>(),
  {
    link: true,
  }
);
</script>
