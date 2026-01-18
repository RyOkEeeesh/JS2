import { buildCSS, watchCSSFiles, getCtxBuildJS } from './build';
await buildCSS();
const ctx = await getCtxBuildJS();
ctx.watch();
watchCSSFiles();