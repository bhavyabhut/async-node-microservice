import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

interface Comment {
  id: string;
  context: string;
}
interface AllPosts {
  [key: string]: {
    title: string;
    id: string;
    comment: Comment[];
  };
}

const allPosts: AllPosts = {};

app.get('/query', (req, res) => {
  res.send(allPosts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('Event logged', type, data);

  if (type === 'PostCreated') {
    allPosts[data.id] = {
      title: data.title,
      id: data.id,
      comment: [],
    };
  } else if (type === 'CommentCreated') {
    allPosts[data.postId].comment.push({ id: data.id, context: data.context });
  }
  res.send();
});

app.listen(4004, () => {
  console.log('server is running on port 4004');
});
