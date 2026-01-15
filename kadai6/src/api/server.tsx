import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import App from '@/app/app';
import Layout from '@/layout';
import { env } from 'env';
import { buildCSS, getCtxBuildJS } from '@/build/build';

const ctx = await getCtxBuildJS();
await ctx.rebuild();
await ctx.dispose();
await buildCSS();

const STATIC = path.resolve(`./${env.out.dir}`);
const app = express();

app.use(express.static(STATIC));

app.get('/', (_, res) => {
  const html = ReactDOMServer.renderToString(<Layout><App /></Layout>);
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(env.port, () => console.log(`http://localhost:${env.port}`));