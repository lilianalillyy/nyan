<template>
  <span @click="onClick">
    <slot />
  </span>
  <transition
    enter-active-class="transition ease-out duration-100 transform"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75 transform"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      class="
        fixed
        top-4
        left-4
        bg-secondary-darkest
        text-blueGray-400
        px-4
        py-2
        rounded-md
      "
      v-show="alertVisible"
    >
      Text copied to the clipboard.
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const alertVisible = ref(false);

    const askForPermissions = async () => {
      const { state } = await navigator.permissions.query({
        name: "clipboard-write",
      });

      if (!["granted", "prompt"].includes(state)) {
        throw new Error("No permissions to write.");
      }
    };

    const legacyCopy = async (str: string) => {
      try {
        await askForPermissions();

        const textArea = document.createElement("textarea");
        textArea.value = str;
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();
        document.execCommand("copy");

        document.body.removeChild(textArea);
      } catch (e) {
        console.log(e);
      }
    };

    const copy = async (str: string) => {
      try {
        await askForPermissions();
        await navigator.clipboard.writeText(str);
      } catch (e) {
        console.log(e);
      }
    };

    const onClick = () => {
      console.log("click");
      alertVisible.value = true;

      (navigator.clipboard.hasOwnProperty("writeText") ? copy : legacyCopy)(
        props.text
      );

      setTimeout(() => alertVisible.value && (alertVisible.value = false), 800);
    };

    return {
      alertVisible,
      onClick,
    };
  },
});
</script>
