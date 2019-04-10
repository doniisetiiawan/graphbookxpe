import express from 'express';
import path from 'path';

const root = path.join(__dirname, '../../');

const app = express();
const port = 8000;

app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));

app.get('/', (req, res) => {
  res.sendFile(path.join(root, 'dist/client/index.html'));
});

app.listen(port, () => console.log('Listening on port 8000...'));
