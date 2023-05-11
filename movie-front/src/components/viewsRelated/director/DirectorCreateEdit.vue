<template>
  <div v-if="director">
    <div v-if="showPreview">
      <Banner text="Fermer la prévisualisation" @click="showPreview = false" />
      <DirectorView :force-director="director" class="dark:bg-zinc-900" />
    </div>
    <div
        v-show="!showPreview"
        class="mx-auto w-11/12 sm:w-5/6 md:w-4/5 lg:w-2/3 xl:w-1/2 mt-8"
    >
      <div class="w-fit mx-auto flex flex-col items-center">
        <div>
          <Label text="Prévisualisation" class="mb-2" />
          <DirectorCard :director="director" :link="false" />
        </div>
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
                ? { name: 'home' }
                : { name: 'directorDetails', params: { id: director.id } }
            "
          >
            <Button
                class="w-full"
                theme="gray"
                :text="
                props.isNew
                  ? 'Retourner à la liste'
                  : `Retourner à la page du réalisateur`
              "
            />
          </RouterLink>
        </div>
      </div>
      <DirectorForm
          class="py-4"
          :director="director"
          @update:director="e => emits('update:director', e)"
          @save="onSave"
          @cancel="director = savedDirector"
          :has-changed="isNew || !_.isEqual(director, savedDirector, { deep: true })"
          v-model:is-valid="isValid"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/generic/Button.vue";
import Label from "@/components/generic/form/Label.vue";
import Banner from "@/components/generic/Banner.vue";
import _ from "lodash";
import {ref} from "vue";
import DirectorView from "@/views/director/DirectorView.vue";
import {Director} from "@/models/Director";
import DirectorCard from "@/components/cards/DirectorCard.vue";
import DirectorForm from "@/components/forms/DirectorForm.vue";

const props = defineProps<{director: Director, savedDirector?: Director, isNew: boolean}>()
const emits = defineEmits<{(e: "update:director", director: Director): void, (e: 'save'): void}>()
const showPreview = ref(false);
const isValid = ref(false)

const onSave = () => {
  if(isValid.value) emits('save')
}
</script>