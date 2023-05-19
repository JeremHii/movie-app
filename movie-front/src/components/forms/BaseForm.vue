<template>
  <div>
    <slot/>

    <div class="flex mt-6 space-x-6">
      <slot name="buttons" :canSave="hasChanged && props.isValid" :canCancel="hasChanged" @cancel="emits('cancel')" @save="emits('save')">
        <Button
            text="Sauvegarder"
            class="w-full"
            @click="emits('save')"
            :disabled="!hasChanged || !props.isValid"
        />
        <Button
            v-if="entity.id"
            text="Annuler les changements"
            class="w-full"
            @click="emits('cancel')"
            theme="error"
            :disabled="!hasChanged"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/generic/Button.vue";

const props = defineProps<{
  entity: any;
  hasChanged: boolean;
  isValid: boolean;
}>();
const emits = defineEmits<{
  (e: "update:entity", entity: any): void;
  (e: "save"): void;
  (e: "cancel"): void;
}>();
</script>
