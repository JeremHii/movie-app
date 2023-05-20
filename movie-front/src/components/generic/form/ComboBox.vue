<template>
  <BaseInput
    :label="props.label"
    :required="props.required"
    :show-error="
      props.required &&
      (props.multiple
        ? props.selected.length === 0
        : props.selected === undefined)
    "
  >
    <Combobox
      :model-value="props.selected"
      @update:model-value="(e) => emits('update:selected', e)"
      :multiple="props.multiple"
    >
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default rounded-lg text-left text-sm border dark:border-zinc-600 border-gray-300 dark:focus:border-zinc-500 dark:placeholder-zinc-400 text-gray-900 dark:text-white"
        >
          <ComboboxInput
            class="w-full border-none bg-red py-2 pl-3 pr-10 text-sm leading-5 rounded-lg bg-gray-50 dark:bg-zinc-700 dark:focus:ring-zinc-500 focus:ring-blue-500 focus:border-blue-500"
            :displayValue="
              (item) =>
                props.multiple
                  ? props.selected
                      .map((item) => getDisplayedAttribute(item))
                      .join(', ')
                  : getDisplayedAttribute(item)
            "
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredItems.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Aucun résultat.
            </div>

            <ComboboxOption
              v-for="item in filteredItems"
              as="template"
              :key="item.id"
              :value="item"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-blue-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate dark:text-white"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  <slot name="option" :item="item" :selected="selected">
                    {{ getDisplayedAttribute(item) }}
                  </slot>
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-blue-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </BaseInput>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import BaseInput from "@/components/generic/form/BaseInput.vue";

const props = withDefaults(
  defineProps<{
    selected?: any | any[] | object | object[];
    items: any[];
    filter: (query: string, item: any) => boolean;
    displayedAttribute: string;
    multiple?: boolean;
    label?: string;
    required?: boolean;
  }>(),
  { multiple: false, required: false }
);

const emits = defineEmits<{
  (e: "update:selected", selected: any | any[] | object | object[]): void;
}>();

let query = ref("");

let filteredItems = computed(() => {
  const realQuery = props.multiple
    ? query.value
        .slice()
        .split(",")
        [query.value.slice().split(",").length - 1].trim()
    : query.value.slice();
  return realQuery === ""
    ? props.items
    : props.items.filter((item) => props.filter(realQuery, item));
});

const getDisplayedAttribute = (item: any) => {
  if (typeof item[props.displayedAttribute] === "function") {
    return item[props.displayedAttribute]();
  }
  return item[props.displayedAttribute];
};
</script>
