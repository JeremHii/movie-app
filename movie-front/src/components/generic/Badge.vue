<template>
  <div class="text-white rounded-md py-0.5 px-2 w-fit text-sm">
    {{ props.content }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ content: string | number }>();
</script>
