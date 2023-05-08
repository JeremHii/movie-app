<template>
  <div
    id="sticky-banner"
    tabindex="-1"
    class="z-50 select-none cursor-pointer flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-700 group dark:hover:bg-zinc-800 dark:border-zinc-600"
  >
    <div class="flex items-center mx-auto">
      <p
        class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-200"
      >
        {{ props.text }}
      </p>
    </div>
    <div class="flex items-center">
      <button
        v-if="closeButton"
        data-dismiss-target="#sticky-banner"
        type="button"
        class="flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-zinc-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string;
    closeButton?: boolean;
  }>(),
  { closeButton: false }
);
</script>
