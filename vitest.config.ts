import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [`./src/setupTest.ts`],
    coverage: {
      reporter: ["text", "html", "lcov", "json-summary", "text-summary"],
      exclude: [
        "node_modules/",
        ".eslintrc.cjs",
        "coverage",
        "postcss.config.js",
        "tailwind.config.js ",
        "src/redux",
      ],
    },
  },
});
