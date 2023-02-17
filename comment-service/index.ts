import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';
import dotenv from 'dotenv';

import base_url from './config';
import { COMMENT_CREATED, COMMENT_UPDATE, COMMENT_MODARATED } from './const';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

interface Commet {
  id: string;
  context: string;
  postId: string;
}
interface Comments {
  [key: string]: Commet[];
}

const comments: Comments = {};

app.post('/post/:id/comment', async (req, res) => {
  const { id } = req.params;
  const { context } = req.body;
  const comment = comments[id];
  const newComment = {
    id: randomBytes(4).toString('hex'),
    context,
    postId: id,
    status: 'pending',
  };
  if (comment) {
    comment.push(newComment);
  } else {
    comments[id] = [newComment];
  }
  try {
    await axios.post(`${base_url.eventBus}events`, {
      type: COMMENT_CREATED,
      data: newComment,
    });
    res.send(newComment);
  } catch (error) {
    console.log(error, 'post id error');
  }
});

app.get('/post/:id/comment', (req, res) => {
  const { id } = req.params;
  res.send(comments[id]);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === COMMENT_MODARATED) {
    console.log('done', type, data, comments);

    comments[data.postId] = comments[data.postId].map((comment) => {
      if (comment.id === data.id) {
        return { ...data };
      } else return comment;
    });
    try {
      await axios.post(`${base_url.eventBus}events`, {
        type: COMMENT_UPDATE,
        data,
      });
    } catch (error) {
      console.log(error, 'events in comment');
    }
  }
  res.send();
});

const COMMET_PORT = process.env.COMMET_PORT || 4002;

app.listen(COMMET_PORT, () => {
  console.log(`comment server is running on port ${COMMET_PORT}`);
});
