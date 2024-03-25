<template>
  <div
    class="
      bg-secondary
      min-w-screen min-h-screen
      flex
      items-center
      justify-center
    "
  >
    <div class="mx-auto max-w-4xl w-full px-8">
      <div class="py-4 text-center">
        <h1 class="text-primary font-bold text-6xl">Nyan</h1>
      </div>
      <div class="w-full py-4">
        <form class="mt-4">
          <div class="my-2">
            <Listbox as="div" v-model="mode">
              <ListboxLabel class="block text-sm font-medium text-blueGray-200">
                Mode
              </ListboxLabel>
              <div class="mt-1 relative">
                <ListboxButton
                  class="
                    bg-secondary-darker
                    relative
                    w-full
                    rounded-md
                    shadow-sm
                    pl-3
                    pr-10
                    py-2
                    text-left
                    cursor-default
                    focus:outline-none
                    hover:bg-secondary-darkest
                    focus:bg-secondary-darkest
                    transition
                    duration-300
                    ease-in-out
                    text-blueGray-400
                    sm:text-sm
                  "
                >
                  <span class="block truncate">{{ mode.display }}</span>
                </ListboxButton>

                <transition
                  leave-active-class="transition ease-in duration-100"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="
                      absolute
                      z-10
                      mt-1
                      w-full
                      bg-secondary-darker
                      shadow-lg
                      max-h-60
                      rounded-md
                      py-1
                      text-base
                      overflow-auto
                      focus:outline-none
                      sm:text-sm
                    "
                  >
                    <ListboxOption
                      as="template"
                      v-for="m in modes"
                      :key="m.name"
                      :value="m"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          'cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-400 hover:bg-secondary-darkest transition duration-200 ease-in-out',
                        ]"
                      >
                        <span
                          :class="[
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          ]"
                        >
                          {{ m.display }}
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
          <textarea
            v-model="input"
            type="text"
            name="Nyan"
            id="nyan"
            class="
              p-4
              w-full
              rounded-md
              bg-secondary-darker
              hover:bg-secondary-darkest
              placeholder-blueGray-500
              hover:placeholder-blueGray-400
              text-gray-200
              transition
              duration-300
              ease-in-out
            "
            placeholder="Nyan away... nyaaa"
          />
        </form>
      </div>
      <div class="py-4 text-center">
        <clipboard :text="result" v-if="result && result.trim().length">
          <div
            class="
              text-center text-primary
              focus:outline-none
              p-4
              w-full
              rounded-md
              bg-secondary-darker
              hover:bg-secondary-darkest
              placeholder-blueGray-500
              hover:placeholder-blueGray-400
              transition
              duration-300
              ease-in-out
              break-all
            "
          >
            {{ result }}
          </div>
        </clipboard>
      </div>
      <footer
        class="py-4 text-center pt-6 mt-6 border-t px-8 border-blueGray-800"
      >
        <span class="text-blueGray-300">
          2021 &copy; Mia &ndash; Nyan Lang is licensed under MIT &ndash;
          <a
            href="https://github.com/vottuscode/nyan"
            target="_blank"
            rel="noreferrer noopener"
            class="
              border-b border-primary
              hover:text-primary
              transition
              duration-300
              ease-in-out
            "
          >
            Source Code
          </a>
        </span>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Clipboard from "./components/Clipboard.vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
// Compiling the TS manually.
import Translator, { TranslationMode } from "@nyan/translator/src";

interface TranslationSelection {
  name: TranslationMode;
  display: string;
}

const modes = [
  { name: "auto", display: "Auto Detect (beta)" },
  { name: "decode", display: "Decode" },
  { name: "encode", display: "Encode" },
] as TranslationSelection[];

export default defineComponent({
  components: {
    Clipboard,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  },
  setup() {
    const mode = ref<TranslationSelection>(modes[0]);
    const input = ref("");
    const result = computed(() =>
      Translator.translate(input.value, mode.value.name)
    );

    return {
      input,
      result,
      mode,
      modes,
    };
  },
});
</script>
