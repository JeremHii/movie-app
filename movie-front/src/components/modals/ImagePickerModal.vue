<template>
  <BaseModal
    :title="props.title"
    :open="props.open"
    @update:open="emits('update:open', false)"
    limit-width="md:w-4/5 w-11/12"
  >
    <div class="flex flex-wrap justify-between" v-if="props.images.length > 0">
      <img
        v-for="(img, idx) in props.images"
        :src="img"
        :key="`${img}-${idx}`"
        class="object-cover m-2 cursor-pointer"
        :class="props.imgClasses"
        @click="emits('selectImage', img)"
      />
    </div>
    <div class="mt-2 dark:text-white" v-else>
      <slot name="notFound">
        <div>Aucune image...</div>
      </slot>
    </div>
    <Button
      class="mt-2"
      text="Annuler"
      theme="error"
      @click="emits('update:open', false)"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "@/components/modals/BaseModal.vue";
import Button from "@/components/generic/Button.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    open: boolean;
    images: string[];
    imgClasses?: string | string[];
  }>(),
  {
    title: "Choisir une image",
    imgClasses: "w-28 h-48",
  }
);
const emits = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "selectImage", img: string): void;
}>();
</script>
