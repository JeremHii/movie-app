<template>
  <div class="flex flex-wrap">
    <DirectorCard
      class="m-1"
      v-for="director in props.directors"
      :key="director.id"
      :director="director"
    />
  </div>
</template>

<script setup lang="ts">
import { Director } from "@/models/Director";
import DirectorCard from "@/components/cards/DirectorCard.vue";

const props = defineProps<{ directors: Director[] }>();
</script>
