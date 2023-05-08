<template>
  <BaseInput
    :required="props.required"
    :label="props.label"
    :show-error="
      showError &&
      props.required &&
      (typeof props.modelValue === 'string'
        ? props.modelValue.trim().length === 0
        : isNaN(props.modelValue.getTime()))
    "
  >
    <div class="relative">
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <component :is="icon" class="w-5 h-5 dark:text-white" />
      </div>
      <input
        :type="type"
        class="block w-full disabled:bg-gray-100 disabled:dark:bg-zinc-800 disabled:cursor-not-allowed p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
        :class="[icon && 'pl-10']"
        :placeholder="placeHolder"
        :value="
          modelValue instanceof Date
            ? DateUtils.formatDateUS(modelValue)
            : modelValue
        "
        :disabled="props.disabled"
        @input="onInput"
        @change="onChange"
      />
    </div>
  </BaseInput>
</template>

<script setup lang="ts">
import { DateUtils } from "@/utils/DateUtils";
import { ref } from "vue";
import BaseInput from "@/components/generic/form/BaseInput.vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | Date;
    placeHolder?: string;
    icon?: any;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    type?: "text" | "date";
  }>(),
  { disabled: false, type: "text", required: false }
);

const showError = ref<boolean>(false);

const emits = defineEmits<{
  (e: "update:modelValue", value: string | Date): void;
}>();

const onInput = (e) => {
  emits(
    "update:modelValue",
    props.type === "date" ? new Date(e.target.value) : e.target.value
  );
};

const onChange = (e) => {
  if (props.required) showError.value = true;
};
</script>
