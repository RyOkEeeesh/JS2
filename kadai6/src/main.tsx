import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import App from './app';
import Layout from './layout';
import { env } from '../env';

const app = express();

app.use(express.static(path.resolve(`./${env.out.dir}`)));

app.get('/', (_req, res) => {
  const html = ReactDOMServer.renderToString(<Layout><App /></Layout>);
  res.send(html);
});

let clients: any[] = [];

app.get('/reload-stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  clients.push(res);
  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
});

app.listen(3000, () => console.log('http://localhost:3000'));