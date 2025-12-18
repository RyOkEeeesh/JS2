import express from 'express';
import path from 'path'
import ReactDOMServer from 'react-dom/server';
import App from './app';
import Layout from './layout';
import { buildClient } from './build';

const app = express();

app.use(express.static(path.resolve("./dist")));

app.get('/', (_req, res) => {
  const html = ReactDOMServer.renderToString(<Layout><App /></Layout>);
  res.send(html);
});

await buildClient();

app.listen(3000, () => console.log('http://localhost:3000'));