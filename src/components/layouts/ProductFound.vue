<template>
  <div>
    <div
      v-if="!products.length && searchValue"
      class="absolute mx-auto py-1 px-3 bg-white border border-gray-300 rounded-md shadow-lg"
    >
      <p class="text-gray-600">No products found.</p>
    </div>

    <div
      v-if="products.length > 0"
      class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <product-card
        v-for="product in products"
        :key="product.title"
        :product="product"
      />
    </div>

    <div v-if="!hasMorePages && products.length > 0" class="mt-5 text-gray-500">
      Not found.
    </div>

    <div
      v-if="hasMorePages && products.length > 0"
      class="mt-5 flex justify-center"
    >
      <button
        @click="loadMoreProducts"
        class="px-3 py-2 bg-gray-200 rounded-md"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue"; // Create ProductCard component

export default {
  props: {
    searchValue: String,
    products: Array,
    hasMorePages: Boolean,
  },
  components: {
    ProductCard,
  },
  methods: {
    loadMoreProducts() {
      this.$emit("load-more-products");
    },
  },
};
</script>
