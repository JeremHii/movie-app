<template>
  <DirectorCreateEdit v-model:director="director" :is-new="true" @save="save" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Api } from "@/services/api/Api";
import { useToast } from "vue-toastification";
import DirectorCreateEdit from "@/components/viewsRelated/director/DirectorCreateEdit.vue";
import { Director } from "@/models/Director";

const router = useRouter();
const director = ref<Director>(
  new Director({
    firstName: "",
    lastName: "",
    nationality: "",
    birthDate: new Date(),
  })
);
const toast = useToast();

const save = async () => {
  const res = await Api.Director.create(director.value);
  if (res) {
    director.value = res;
    toast.success("Le réalisateur a été créé.");
    await router.push({
      name: "directorDetails",
      params: { id: director.value.id },
    });
  }
};
</script>
