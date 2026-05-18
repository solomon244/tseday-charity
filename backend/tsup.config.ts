import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  target: "node20",
  platform: "node",
  clean: true,
  splitting: true,
  sourcemap: true,
  tsconfig: "tsconfig.json",
});
