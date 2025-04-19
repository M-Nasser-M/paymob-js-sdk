import { build } from "bun";

async function runBuild() {
  // Build ESM version
  await build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist/esm",
    format: "esm",
    target: "node",
    minify: true,
    sourcemap: "external",
    packages: "bundle",
  });

  // Build CommonJS version
  await build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist/cjs",
    format: "cjs",
    target: "node",
    minify: true,
    sourcemap: "external",
    packages: "bundle",
  });

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("Build completed successfully!");
}

runBuild().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
