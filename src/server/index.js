import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

const root = path.join(__dirname, '../../');

const app = express();
const port = 8000;

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:', '*.amazonaws.com'],
  },
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(compression());
app.use(cors());

app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));

app.get('/', (req, res) => {
  res.sendFile(path.join(root, 'dist/client/index.html'));
});

app.listen(port, () => console.log('Listening on port 8000...'));
