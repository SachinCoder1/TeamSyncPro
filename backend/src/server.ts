import express from 'express';
import CONNECT_MONGO_DB from './db';
const app = express();
const PORT = process.env.PORT || 8000;


CONNECT_MONGO_DB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});