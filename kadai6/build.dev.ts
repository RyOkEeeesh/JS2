import { buildCSS, watchCSSFiles, watchJS } from './build';
await buildCSS();
await watchJS();
watchCSSFiles();