<template>
  <div class="relative py-4 w-full">
    <div
      class="w-full sm:px-8 md:px-16 lg:px-40 flex text-black dark:text-white flex-col sm:flex-row items-center sm:items-start"
    >
      <div
        class="my-auto overflow-x-hidden flex flex-col md:flex-row items-center md:space-x-4 pr-2 pb-2"
      >
        <div>
          <span class="font-bold text-3xl md:text-4xl">
            {{ props.genre.name }}
          </span>
        </div>
        <div class="mt-2">
          <IconButton :icon="PencilIcon" @click="emits('edit')" />
          <IconButton
            :icon="TrashIcon"
            theme="error"
            class="ml-2"
            @click="emits('delete')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import IconButton from "@/components/generic/IconButton.vue";
import { Genre } from "@/models/Genre";

const props = defineProps<{ genre: Genre }>();
const emits = defineEmits<{ (e: "delete"): void; (e: "edit"): void }>();
</script>
