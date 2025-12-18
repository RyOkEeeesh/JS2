import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

export async function buildClient() {
  await esbuild.build({
    entryPoints: ["src/client.tsx"],
    bundle: true,
    outfile: path.resolve("dist/script.js"),
  });

  const css = fs.readFileSync("src/index.css", "utf8");
  const result = await postcss([tailwind({})]).process(css, { from: "src/index.css" });

  fs.mkdirSync("dist", { recursive: true });
  fs.writeFileSync("dist/style.css", result.css);
}