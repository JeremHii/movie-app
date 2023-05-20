<template>
  <BaseInput :label="props.label">
    <div class="flex space-x-4 items-center">
      <input
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700"
        type="range"
        @input="onInput"
        :min="props.min"
        :max="props.max"
        :value="props.modelValue"
        :step="props.step"
      />
      <span class="font-medium dark:text-white h-fit" v-if="showValue">{{
        props.modelValue
      }}</span>
    </div>
  </BaseInput>
</template>

<script setup lang="ts">
import BaseInput from "@/components/generic/form/BaseInput.vue";

const props = withDefaults(
  defineProps<{
    min: number;
    max: number;
    step?: number;
    modelValue: string | number;
    label?: string;
    disabled?: boolean;
    showValue?: boolean;
  }>(),
  {}
);
const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const onInput = (e: any) => {
  emits("update:modelValue", e.target.value);
};
</script>
