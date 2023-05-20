<template>
  <BaseInput
    :label="props.label"
    :show-error="
      props.required && showError && props.modelValue.trim().length === 0
    "
    :required="props.required"
  >
    <textarea
      class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
      :placeholder="placeHolder"
      :value="modelValue"
      :rows="props.rows || 2"
      @input="onInput"
      @change="onChange"
    />
  </BaseInput>
</template>

<script setup lang="ts">
import BaseInput from "@/components/generic/form/BaseInput.vue";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeHolder?: string;
    label?: string;
    rows?: number;
    required?: boolean;
  }>(),
  { required: false }
);

const showError = ref<boolean>(false);

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onInput = (e: any) => {
  emits("update:modelValue", e.target.value);
};

const onChange = () => {
  if (props.required) showError.value = true;
};
</script>
