<template>
  <nav class="bg-white border-gray-200 dark:bg-zinc-950/30">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center">
          <img src="/logo.png" class="h-8 mr-3" alt="Movie Logo" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Movie</span
          >
        </div>
      </RouterLink>
      <div class="flex md:order-2">
        <button
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          class="md:hidden text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-zinc-700 rounded-lg text-sm p-2.5 mr-1"
        >
          <MagnifyingGlassIcon class="w-5 h-5 dark:text-white" />
        </button>
        <ItemSearchBar
          v-model:query="search"
          :items="itemsFound"
          class="hidden md:block"
        />

        <button
          type="button"
          class="inline-flex md:ml-2 items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
          @click="DarkMode.switch()"
        >
          <SunIcon v-if="isDarkMode" class="w-5 h-5" />
          <MoonIcon v-else class="w-5 h-5" />
        </button>

        <button
          data-collapse-toggle="navbar-search"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
          aria-controls="navbar-search"
          aria-expanded="false"
        >
          <Bars3Icon class="w-5 h-5 dark:text-white" />
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-search"
      >
        <ItemSearchBar
          v-model:query="search"
          :items="itemsFound"
          class="mt-3 md:hidden"
        />
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-transparent dark:border-zinc-700"
        >
          <li v-for="menu in menus" :key="menu.pathName">
            <RouterLink
              class="block py-2 pl-3 pr-4 text-black hover:bg-blue-700 hover:text-white md:hover:bg-transparent text-black dark:text-white rounded md:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:text-zinc-500 dark:md:hover:text-white"
              :to="{ name: menu.pathName }"
            >
              {{ menu.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
} from "@heroicons/vue/20/solid";
import { DarkMode, useDarkMode } from "@/utils/DarkMode";
import { ref, watch } from "vue";
import { Api } from "@/services/api/Api";
import ItemSearchBar from "@/components/layout/navbar/ItemSearchBar.vue";
import type { ItemsType } from "@/utils/ItemsType";
import { useRouter } from "vue-router";

const search = ref("");

const defaultItemsFound = { movies: [], directors: [], genres: [] };
const itemsFound = ref<ItemsType>(defaultItemsFound);

const { isDarkMode } = useDarkMode();
const router = useRouter();

router.beforeEach(() => {
  search.value = "";
});

watch(search, async () => {
  if (search.value.trim().length < 3) {
    itemsFound.value = defaultItemsFound;
    return;
  }
  itemsFound.value = await Api.Search.search(search.value);
});

const menus = [
  {
    name: "Films",
    pathName: "home",
  },
  {
    name: "Réalisateurs",
    pathName: "directors",
  },
  {
    name: "Genres",
    pathName: "genres",
  },
];
</script>
