import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

import { COMMENT_CREATED, COMMENT_MODARATED } from '../const';
import base_url from '../config';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === COMMENT_CREATED) {
    if (data.context && data.context.includes('orange')) {
      data.status = 'rejected';
    } else {
      data.status = 'approved';
    }
    axios.post(`${base_url.eventBus}events`, {
      type: COMMENT_MODARATED,
      data,
    });
  }

  res.send();
});

const MODERATION_PORT = process.env.MODERATION_PORT || 4003;

app.listen(MODERATION_PORT, () => {
  console.log(`moderation server is running on port ${MODERATION_PORT}`);
});
