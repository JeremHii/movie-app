<template>
  <DirectorCreateEdit v-if="director" v-model:director="director" :saved-director="savedDirector" :is-new="false" @save="save"/>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { Director } from "@/models/Director";
import { Api } from "@/services/api/Api";
import _ from "lodash";
import { useToast } from "vue-toastification";
import DirectorCreateEdit from "@/components/viewsRelated/director/DirectorCreateEdit.vue";

const route = useRoute();
const router = useRouter();
const director = ref<Director | null>(null);
const savedDirector = ref<Director | null>(null);
const toast = useToast();

onBeforeMount(async () => {
  if (!route.params.id) return;
  director.value = await Api.Director.getOne(route.params.id);
  savedDirector.value = _.clone(director.value, { deep: true });
  if (director.value === null) {
    await router.push({ name: "directors" });
    return;
  }
});

const save = async () => {
  const res = await Api.Director.update(director.value.id, director.value);
  if (res) {
    director.value = res;
    savedDirector.value = _.clone(director.value);
    toast.success("Les modifications ont été enregistrées.");
  }
};
</script>
