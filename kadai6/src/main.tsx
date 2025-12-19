import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import App from './app';
import Layout from './layout';
import { env } from '../env';
import livereload from 'livereload';
import connectLiveReload from 'connect-livereload';

const STATIC = path.resolve(`./${env.out.dir}`);
const app = express();

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(STATIC);

app.use(connectLiveReload());
app.use(express.static(STATIC));

app.get('/', (_, res) => {
  const html = ReactDOMServer.renderToString(<Layout><App /></Layout>);
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>${html}`);
});

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.listen(3000, () => console.log('http://localhost:3000'));