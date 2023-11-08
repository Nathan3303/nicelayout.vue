import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    build: {
        lib: {
            entry: "./packages/nice-layout/index.js",
            name: "nice-layout",
        },
        outDir: "./nllib",
        copyPublicDir: false,
    },
    plugins: [vue()],
});
