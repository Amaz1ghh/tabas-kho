import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                backstage: resolve(__dirname, "./pages/backstage.html"),
                critique: resolve(__dirname, "./pages/critique.html"),
                saisons: resolve(__dirname, "./pages/saisons.html"),
            },
        },
    },
});