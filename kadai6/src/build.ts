import { build } from "esbuild/mod.js";
import { exec } from "exec/mod.ts";

export async function buildClient() {

  await build({
    entryPoints: ["src/client.tsx"],
    bundle: true,
    outfile: "/dist/bundle.js",
  });

  await exec("npx tailwindcss -i src/index.css -o /dist/output.css --minify");
}