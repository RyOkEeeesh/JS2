import express from 'express';
import path from 'node:path'
import { fileURLToPath } from "node:url";
import ReactDOMServer from 'react-dom/server';
import App from '@/app.tsx';
import Layout from '@/layout.tsx';
import { buildClient } from '@/build.ts';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(path.join(__dirname, "dist")));

app.get('/', (_req, res) => {
  const html = ReactDOMServer.renderToString(<Layout><App /></Layout>);
  res.send(html);
});

await buildClient();

app.listen(3000, () => console.log('http://localhost:3000'));