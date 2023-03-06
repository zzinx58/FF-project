import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // Env file position.
  envDir: "./src",
  envPrefix: ["VITE_", "CLOUDBASE_"],
  plugins: [vue()],
});
