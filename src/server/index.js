import express from 'express';

const app = express();
const port = 8000;

app.get('/', (req, res, next) => {
  console.log('First function...');
  next();
}, (req, res) => {
  console.log('Second function...');
  res.send('Hello world...');
});

app.listen(port, () => console.log('Listening on port 8000...'));
