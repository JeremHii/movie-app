<template>
  <RouterLink
    :to="{ name: 'directorDetails', params: { id: props.director.id } }"
  >
    <SearchCard>
      {{ props.director.getFullName() }}
    </SearchCard>
  </RouterLink>
</template>

<script setup lang="ts">
import { Director } from "@/models/Director";
import SearchCard from "@/components/layout/navbar/SearchCard.vue";

const props = defineProps<{ director: Director }>();
</script>
