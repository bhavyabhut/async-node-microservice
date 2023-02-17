import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';
import dotenv from 'dotenv';

import base_url from './config';
import { POST_CREATED } from './const';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

interface Posts {
  [key: string]: {
    id: string;
    title: string;
  };
}

const posts: Posts = {};

app.post('/post', async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString('hex');
  posts[id] = {
    id,
    title,
  };
  try {
    await axios.post(`${base_url.eventBus}events`, {
      type: POST_CREATED,
      data: {
        id,
        title,
      },
    });
  } catch (error) {
    console.log(error, 'sending post to event bus');
  }

  res.send(posts[id]);
});

app.get('/post', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  res.send();
});

const POST_PORT = process.env.POST_PORT || 4001;

app.listen(POST_PORT, () => {
  console.log(`post server is running on port ${POST_PORT}`);
});
