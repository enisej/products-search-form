<template>
  <div class="container mt-5 mx-auto">
    <form>
      <label
        for="search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <v-icon name="bi-search" />
        </div>
        <input
          v-model="searchValue"
          @input="handleSearchInput"
          type="search"
          id="search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
        <button
          type="button"
          @click="submitForm"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>

    <product-found
      :search-value="this.searchValue"
      :has-more-pages="this.hasMorePages"
      :products="this.products"
      @load-more-products="loadMoreProducts"
    />
  </div>
  <error-modal :error-message="errorModalMessage" @close="clearErrorModal" />
</template>

<script>
import axios from "axios";
import ErrorModal from "./errors/ErrorModal.vue";
import ProductFound from "./layouts/ProductFound.vue";

export default {
  data() {
    return {
      searchValue: "",
      products: [],
      currentPage: 1,
      hasMorePages: true,
      errorModalMessage: "",
    };
  },
  components: {
    ErrorModal,
    ProductFound,
  },
  methods: {
    async submitForm() {
      this.resetProducts();
      this.currentPage = 1;
      this.hasMorePages = true;
      await this.fetchProducts();
    },

    async fetchProducts(page = 1) {
      const searchValue = this.searchValue.trim();

      // Skip fetching if the search value is empty
      if (!searchValue) {
        return [];
      }

      // Add your API endpoint URL
      const apiUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/products/search`;

      // Add your API request payload with the page parameter
      const requestData = {
        q: searchValue,
        page,
      };

      try {
        // Make a POST request to the API
        const response = await axios.post(apiUrl, requestData);

        // Check if there are more pages
        const morePages = response.data.length > 0;

        // If it's the first page, update products directly; otherwise, append to the existing products
        if (page === 1) {
          this.products = response.data;
        } else {
          this.products = this.products.concat(response.data);
        }

        return morePages;
      } catch (error) {
        this.handleError(error);
        return false;
      }
    },
    async loadMoreProducts() {
      this.currentPage += 1;
      this.hasMorePages = await this.fetchProducts(this.currentPage);
    },
    resetProducts() {
      this.products = [];
    },
    handleSearchInput() {
      this.resetProducts();
      this.currentPage = 1;
      this.hasMorePages = true;
      this.fetchProducts();
    },
    handleError(error) {
      if (error.response.data.code && error.response.data.message) {
        this.errorModalMessage = `${error.response.data.code}: ${error.response.data.message}`;
      } else {
        this.errorModalMessage = "An unexpected error occurred.";
      }
    },
    clearErrorModal() {
      this.errorModalMessage = "";
    },
  },
};
</script>
