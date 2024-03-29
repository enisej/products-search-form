import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  host: true,
  watch: {
    usePolling: true
  },
  server:{
    port: 8080
  },
  plugins: [vue()],
});
