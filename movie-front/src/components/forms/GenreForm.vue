<template>
  <BaseForm
    :has-changed="props.hasChanged"
    :is-valid="props.isValid"
    :entity="props.genre"
    @update:entity="(e) => emits('update:genre', e)"
    @save="emits('save')"
    @cancel="emits('cancel')"
  >
    <TextInput
      label="Nom"
      :model-value="props.genre.name"
      required
      @update:model-value="(e) => updateAttribute('name', e)"
    />
    <template #buttons="{ canCancel, canSave }">
      <slot name="buttons" :canCancel="canCancel" :canSave="canSave"></slot>
    </template>
  </BaseForm>
</template>

<script setup lang="ts">
import { Genre } from "@/models/Genre";
import BaseForm from "@/components/forms/BaseForm.vue";
import TextInput from "@/components/generic/form/TextInput.vue";
import _ from "lodash";
import { watch } from "vue";

const props = defineProps<{
  genre: Genre;
  hasChanged: boolean;
  isValid: boolean;
}>();
const emits = defineEmits<{
  (e: "update:genre", genre: Genre): void;
  (e: "update:isValid", isValid: boolean): void;
  (e: "save"): void;
  (e: "cancel"): void;
}>();

const updateAttribute = (attribute: string, value: any) => {
  const newGenre: Genre = _.cloneDeep(props.genre);
  //@ts-ignore
  newGenre[attribute] = value;
  emits("update:genre", newGenre);
};

watch(props, () => {
  const isValid: boolean = props.genre.name.trim() !== "";
  emits("update:isValid", isValid);
});
</script>
