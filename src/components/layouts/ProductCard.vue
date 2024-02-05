<template>
  <div class="bg-white overflow-hidden shadow-md rounded-lg p-4">
    <h2 class="text-lg font-medium text-gray-800">{{ product.title }}</h2>
    <p class="text-gray-600">{{ product.description }}</p>
    <p class="mt-2 text-blue-700 font-bold">
      ${{ product.final_price.toFixed(2) }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>
