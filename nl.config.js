import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
    build: {
        lib: {
            entry: "./packages/nice-layout/index.js",
            name: "nice-layout",
        },
        outDir: "./dist",
        copyPublicDir: false,
        emptyOutDir: false,
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
    plugins: [
        vue(),
        cssInjectedByJsPlugin({
            injectCodeFunction: function injectCodeCustomRunTimeFunction(cssCode) {
                try {
                    if (typeof document != "undefined") {
                        var elementStyle = document.createElement("style");
                        elementStyle.appendChild(document.createTextNode(`${cssCode}`));
                        document.head.appendChild(elementStyle);
                    }
                } catch (e) {
                    console.error("vite-plugin-css-injected-by-js", e);
                }
            },
        }),
    ],
});
