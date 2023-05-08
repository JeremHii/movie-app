<template>
  <div>
    <div v-if="label" class="mb-2 flex items-center">
      <Label :text="props.label" />
      <span v-if="required" class="text-red-600 ml-1 text-sm font-bold">*</span>
    </div>
    <slot />
    <div class="text-sm text-red-600 dark:text-red-400" v-if="showError">
      Veuillez remplir ce champ
    </div>
  </div>
</template>

<script setup lang="ts">
import Label from "@/components/generic/form/Label.vue";
const props = withDefaults(
  defineProps<{
    required?: boolean;
    label?: string;
    showError?: boolean;
  }>(),
  { required: false, showError: false }
);
</script>
