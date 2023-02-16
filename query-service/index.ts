import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

import { COMMENT_CREATED, COMMENT_UPDATE, POST_CREATED } from './const';
import base_url from './config';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

interface Comment {
  id: string;
  context: string;
  status: string;
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

const handleEvent = (type: string, data: any) => {
  if (type === POST_CREATED) {
    allPosts[data.id] = {
      title: data.title,
      id: data.id,
      comment: [],
    };
  } else if (type === COMMENT_CREATED) {
    allPosts[data.postId].comment.push({
      id: data.id,
      context: data.context,
      status: data.status,
    });
  } else if (type === COMMENT_UPDATE) {
    allPosts[data.postId].comment = allPosts[data.postId].comment.map(
      (comment) => {
        if (comment.id === data.id) {
          return { ...data };
        } else return comment;
      }
    );
  }
};

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('Event logged', type, data);
  handleEvent(type, data);
  res.send();
});

const QUERY_PORT = process.env.QUERY_PORT;

app.listen(QUERY_PORT, async () => {
  try {
    console.log(`query server is running on port ${QUERY_PORT}`);
    const { data } = await axios.get(`${base_url.eventBus}all-events`);
    data.map((d: any) => handleEvent(d.type, d.data));
  } catch (error) {
    console.log(error, 'errors');
  }
});
