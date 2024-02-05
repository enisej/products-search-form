<template>
  <div
    v-if="errorMessage"
    class="fixed inset-0 flex items-center justify-center"
  >
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="bg-white rounded-lg p-8 z-10">
      <h2 class="text-2xl font-bold mb-4">Error</h2>
      <p class="text-gray-700">{{ errorMessage }}</p>
      <button
        @click="closeModal"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
