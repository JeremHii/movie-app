<template>
  <Navbar />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/layout/navbar/Navbar.vue";
import { initFlowbite } from "flowbite";
import { onBeforeMount, onMounted, ref } from "vue";
import { DarkMode } from "@/utils/DarkMode";

onMounted(async () => {
  initFlowbite();
});

onBeforeMount(() => {
  DarkMode.init();
});
</script>
