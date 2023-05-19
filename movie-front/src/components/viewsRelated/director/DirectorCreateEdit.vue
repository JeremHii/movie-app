<template>
  <div v-if="director">
    <EntityCreateEdit list-path-name="home" back-to-entity="Retourner à l'affiche du film" entity-path-name="directorDetails" :is-new="props.isNew" :entity="director">
      <template #preview>
        <DirectorView :force-director="director" class="dark:bg-zinc-900" />
      </template>
      <template #smallPreview>
        <DirectorCard :director="director" :link="false" />
      </template>
      <template #form>
        <DirectorForm
            class="py-4"
            :director="director"
            @update:director="e => emits('update:director', e)"
            @save="onSave"
            @cancel="emits('update:director', savedDirector)"
            :has-changed="isNew || !_.isEqual(director, savedDirector, { deep: true })"
            v-model:is-valid="isValid"
        />
      </template>
    </EntityCreateEdit>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import {ref} from "vue";
import DirectorView from "@/views/director/DirectorView.vue";
import {Director} from "@/models/Director";
import DirectorCard from "@/components/cards/DirectorCard.vue";
import DirectorForm from "@/components/forms/DirectorForm.vue";
import EntityCreateEdit from "@/components/generic/EntityCreateEdit.vue";

const props = defineProps<{director: Director, savedDirector?: Director, isNew: boolean}>()
const emits = defineEmits<{(e: "update:director", director: Director): void, (e: 'save'): void}>()
const isValid = ref(false)

const onSave = () => {
  if(isValid.value) emits('save')
}
</script>