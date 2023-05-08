<template>
  <div class="flex items-center flex-col sm:flex-row">
    <RouterLink
      :to="{ name: 'directorDetails', params: { id: props.director.id } }"
      class="block"
    >
      <div class="w-32">
        <img
          :src="props.director.getPicture()"
          class="w-full max-h-72 object-cover rounded-lg"
        />
      </div>
    </RouterLink>
    <div class="ml-2 flex flex-col">
      <div class="mx-auto sm:mx-0">
        <div class="font-bold dark:text-gray-100">
          {{ props.director.getFullName() }}
        </div>
        <div class="-mt-1.5 dark:text-gray-100">Réalisateur</div>
      </div>
      <div class="text-sm mt-1 dark:text-gray-100">
        {{ props.director.getBiography() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Director } from "@/models/Director";

const props = withDefaults(
  defineProps<{ director: Director; link?: boolean }>(),
  { link: true }
);
</script>
