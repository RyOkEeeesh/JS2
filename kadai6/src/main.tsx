import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import App from './app';
import Layout from './layout';
import { build } from './build';
import { env } from '../env';

const app = express();

app.use(express.static(path.resolve(`./${env.out.dir}`)));

app.get('/', (_req, res) => {
  const html = ReactDOMServer.renderToString(<Layout><App /></Layout>);
  res.send(html);
});

build().catch(e => console.error(e));

app.listen(3000, () => console.log('http://localhost:3000'));