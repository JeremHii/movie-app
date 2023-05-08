<template>
  <div class="block text-sm font-medium text-gray-900 dark:text-white">
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string }>();
</script>
