import { fileURLToPath, URL } from "node:url";

import UnoCSS from "unocss/vite";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import mdPlugin, { Mode } from "vite-plugin-markdown";

// used in config plugins array

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS(), mdPlugin({ mode: [Mode.HTML] })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5000,
  },
});
