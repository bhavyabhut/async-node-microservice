import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';

const app = express();

app.use(express.json());
app.use(cors());

interface Comments {
  [key: string]: [
    {
      id: string;
      context: string;
      postId: string;
    }
  ];
}

const comments: Comments = {};

app.post('/post/:id/comment', (req, res) => {
  const { id } = req.params;
  const { context } = req.body;
  const comment = comments[id];
  const newComment = {
    id: randomBytes(4).toString('hex'),
    context,
    postId: id,
  };
  if (comment) {
    comment.push(newComment);
  } else {
    comments[id] = [newComment];
  }
  res.send(newComment);
});

app.get('/post/:id/comment', (req, res) => {
  const { id } = req.params;
  res.send(comments[id]);
});

app.listen(4002, () => {
  console.log('server is running on port 4002');
});
