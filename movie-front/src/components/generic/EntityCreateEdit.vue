<template>
  <div v-if="showPreview">
    <Banner text="Fermer la prévisualisation" @click="showPreview = false" />
    <slot name="preview"></slot>
  </div>
  <div
      v-show="!showPreview"
      class="mx-auto w-11/12 sm:w-5/6 md:w-4/5 lg:w-2/3 xl:w-1/2 mt-8"
  >
    <div class="w-fit mx-auto">
      <Label text="Prévisualisation" class="mb-2" />
      <slot name="smallPreview"></slot>
      <div class="flex flex-col mt-2 space-y-2">
        <Button
            class="w-full"
            @click="showPreview = true"
            text="Prévisualiser la page entière"
        />
        <RouterLink
            class="w-full"
            :to="
            props.isNew
              ? { name: props.listPathName }
              : { name: props.entityPathName, params: { id: entity.id } }
          "
        >
          <Button
              class="w-full"
              theme="gray"
              :text="
              props.isNew
                ? 'Retourner à la liste'
                : props.backToEntity
            "
          />
        </RouterLink>
      </div>
    </div>
    <slot name="form"></slot>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/generic/Button.vue";
import Label from "@/components/generic/form/Label.vue";
import Banner from "@/components/generic/Banner.vue";
import {ref} from "vue";

const props = defineProps<{entity: object, isNew: boolean, backToEntity: string, listPathName: string, entityPathName: string}>()
const showPreview = ref<boolean>(false)

</script>
