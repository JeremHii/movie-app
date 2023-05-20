<template>
  <BaseModal :title="props.title" :open="props.open" @update:open="close">
    <div class="mt-2">
      <slot>
        <p class="text-sm text-gray-500 dark:text-gray-200">
          {{ props.content }}
        </p>
      </slot>
    </div>

    <slot name="buttons">
      <div class="mt-4 flex">
        <Button
          :theme="props.buttonConfirmTheme"
          text="Confirmer"
          @click="confirm"
          :disabled="props.buttonConfirmDisabled"
        />
        <Button
          theme="gray"
          text="Annuler"
          class="ml-1"
          @click="cancel"
          :disabled="props.buttonCancelDisabled"
        />
      </div>
    </slot>
  </BaseModal>
</template>

<script setup lang="ts">
import Button from "@/components/generic/CustomButton.vue";
import BaseModal from "@/components/modals/BaseModal.vue";

const props = withDefaults(
  defineProps<{
    open: boolean;
    title?: string;
    content?: string;
    buttonConfirmTheme?: string;
    buttonConfirmDisabled?: boolean;
    buttonCancelDisabled?: boolean;
    closeOnConfirm?: boolean;
  }>(),
  {
    title: "Veuillez confirmer votre action",
    content: "Etes-vous sûr de vouloir faire cela ?",
    buttonConfirmTheme: "error",
    buttonConfirmDisabled: false,
    buttonCancelDisabled: false,
    closeOnConfirm: true,
  }
);
const emits = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const cancel = () => {
  close();
  emits("cancel");
};

const confirm = () => {
  if (props.closeOnConfirm) {
    close();
  }
  emits("confirm");
};

const close = () => {
  emits("update:open", false);
};
</script>
