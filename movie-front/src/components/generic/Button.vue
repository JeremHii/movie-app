<template>
  <button
    type="button"
    class="text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors flex items-center"
    :class="[
      props.disabled
        ? 'cursor-not-allowed bg-gray-400 dark:bg-gray-500'
        : getButtonClasses(props.theme),
    ]"
    :disabled="props.disabled"
  >
    <component v-if="props.icon" :is="props.icon" class="w-5 h-5 mr-2" />
    <span>{{ props.text }}</span>
  </button>
</template>

<script setup lang="ts">
import { getButtonClasses } from "@/utils/ButtonUtils";
import type { ButtonTheme } from "@/utils/ButtonUtils";

const props = withDefaults(
  defineProps<{
    text: string;
    disabled?: boolean;
    icon?: any
    theme?: ButtonTheme;
  }>(),
  { theme: "normal" }
);
</script>
