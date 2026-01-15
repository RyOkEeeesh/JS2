import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { env } from './env';

const IN = {
  tsx: `${env.in.dir}/${env.in.tsx}`,
  css: `${env.in.dir}/${env.in.css}`,
};

const OUT = {
  js: `${env.out.dir}/${env.out.js}`,
  css: `${env.out.dir}/${env.out.css}`,
};

export async function buildCSS() {
  const css = fs.readFileSync(IN.css, 'utf8');
  const result = await postcss([tailwind({})]).process(css, { from: IN.css });

  fs.mkdirSync(env.out.dir, { recursive: true });
  fs.writeFileSync(OUT.css, result.css);
}

export async function buildJS() {
  const ctx = await esbuild.context({
    entryPoints: [IN.tsx],
    bundle: true,
    format: 'esm',
    target: ['esnext'],
    outfile: path.resolve(OUT.js),
    logLevel: 'error',
    sourcemap: true,
  });
  return ctx;
}

export async function watchJS() {
  const ctx = await buildJS();
  await ctx.watch();
  return ctx;
}

export function watchCSSFiles() {
  fs.watch(env.in.dir, { recursive: true }, async (_, filename) => {
    if (!filename) return;
    if (/\.(ts|tsx|css)$/.test(filename)) {
      try {
        await buildCSS();
      } catch (e) {
        console.error(e);
      }
    }
  });
}