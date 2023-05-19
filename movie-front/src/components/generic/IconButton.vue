<template>
  <button
    type="button"
    class="text-white font-medium rounded-lg text-center items-center inline-flex text-sm p-2.5 transition-colors"
    :class="[
      props.disabled
        ? 'cursor-not-allowed bg-gray-400 dark:bg-gray-500'
        : getButtonClasses(props.theme),
    ]"
    :disabled="props.disabled"
  >
    <component :is="props.icon" class="w-5 h-5" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { getButtonClasses } from "@/utils/ButtonUtils";
import type { ButtonTheme } from "@/utils/ButtonUtils";

const props = withDefaults(
  defineProps<{
    icon: any;
    disabled?: boolean;
    theme?: ButtonTheme;
  }>(),
  { theme: "normal" }
);
</script>
