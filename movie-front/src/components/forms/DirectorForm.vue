<template>
  <div>
    <TextInput
      label="Prénom"
      :model-value="props.director.firstName"
      required
      @update:model-value="(e) => updateAttribute('firstName', e)"
    />
    <TextInput
        class="mt-2"
        label="Nom"
        :model-value="props.director.lastName"
        required
        @update:model-value="(e) => updateAttribute('lastName', e)"
    />
    <TextInput
      class="mt-2"
      label="Nationalité"
      :model-value="props.director.nationality"
      required
      @update:model-value="(e) => updateAttribute('nationality', e)"
    />
    <TextInput
        class="mt-2"
        label="Date de naissance"
        type="date"
        :model-value="props.director.birthDate"
        @update:model-value="(e) => updateAttribute('birthDate', e)"
        required
    />
    <TextAreaInput
        class="mt-2"
        label="Biographie"
        :rows="5"
        :model-value="props.director.biography"
        @update:model-value="(e) => updateAttribute('biography', e)"
    />
    <TextInput
      class="mt-2"
      label="Image de profil"
      :model-value="props.director.picture"
      @update:model-value="(e) => updateAttribute('picture', e)"
    />

    <div class="flex mt-6 space-x-6">
      <Button
        text="Sauvegarder"
        class="w-full"
        @click="emits('save')"
        :disabled="!hasChanged || !props.isValid"
      />
      <Button
          v-if="director.id"
          text="Annuler les changements"
          class="w-full"
          @click="emits('cancel')"
          theme="error"
          :disabled="!hasChanged"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextInput from "@/components/generic/form/TextInput.vue";
import { watch } from "vue";
import TextAreaInput from "@/components/generic/form/TextAreaInput.vue";
import Button from "@/components/generic/button.vue";
import { Director } from "@/models/Director";
import _ from "lodash";

const props = defineProps<{
  director: Director;
  hasChanged: boolean;
  isValid: boolean;
}>();
const emits = defineEmits<{
  (e: "update:director", director: Director): void;
  (e: "update:isValid", isValid: boolean): void;
  (e: "save"): void;
  (e: "cancel"): void;
}>();

const updateAttribute = (attribute: string, value: any) => {
  const newDirector: Director = _.clone(props.director);
  newDirector[attribute] = value;
  emits("update:director", newDirector);
};

watch(props, () => {
  const isValid: boolean =
    props.director.firstName.trim() !== "" &&
    props.director.lastName.trim() !== "" &&
      props.director.nationality.trim() !== "" &&
      !isNaN(props.director.birthDate.getTime())
  emits("update:isValid", isValid);
});
</script>