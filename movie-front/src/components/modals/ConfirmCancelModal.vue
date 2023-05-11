<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="emits('update:open', false)" class="relative z-[1000]">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >
                {{props.title}}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{props.content}}
                </p>
              </div>

              <div class="mt-4">
                <Button theme="error" text="Confirmer" @click="confirm"/>
                <Button theme="gray" text="Annuler" class="ml-1" @click="cancel"/>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import Button from "@/components/generic/Button.vue";

const props = withDefaults(defineProps<{open: boolean, title?: string, content?: string}>(), {title: "Veuillez confirmer votre action", content: "Etes-vous sûr de vouloir faire cela ?"})
const emits = defineEmits<{(e: 'update:open', value: boolean): void, (e: 'confirm'): void, (e: 'cancel'): void}>()

const cancel = () => {
  close()
  emits('cancel')
}

const confirm = () => {
  close()
  emits('confirm')
}


const close = () => {
  emits('update:open', false)
}

</script>
