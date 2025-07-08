import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  outDir: "dist",
  outExtension: () => ({ js: ".js" }),
  target: "esnext",
  clean: true,
  splitting: false,
  watch: true,
  shims: false,
});
