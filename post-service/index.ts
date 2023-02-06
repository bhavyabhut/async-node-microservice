import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';

const app = express();

app.use(express.json());
app.use(cors());

interface Posts {
  [key: string]: {
    id: string;
    title: string;
  };
}

const posts: Posts = {};

app.post('/post', (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString('hex');
  posts[id] = {
    id,
    title,
  };
  res.send(posts[id]);
});

app.get('/post', (req, res) => {
  res.send(posts);
});

app.listen(4001, () => {
  console.log('server is running on port 4001');
});
