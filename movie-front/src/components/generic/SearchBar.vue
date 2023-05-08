<template>
  <TextInput
    :model-value="modelValue"
    @update:model-value="(e) => emits('update:modelValue', e)"
    :icon="MagnifyingGlassIcon"
    :place-holder="placeHolder"
  />
</template>

<script setup lang="ts">
import TextInput from "@/components/generic/form/TextInput.vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  modelValue: string;
  placeHolder?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
