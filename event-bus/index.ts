import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import base_url from '../config';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

interface AllEvents {
  type: string;
  data: string;
}

const allEvents: AllEvents[] = [];

const handleEvent = async (type: string, data: any) => {
  try {
    const event = { type, data };
    allEvents.push(event);
    await axios.post(`${base_url.post}events`, event);
    await axios.post(`${base_url.comment}events`, event);
    await axios.post(`${base_url.moderation}events`, event);
    await axios.post(`${base_url.query}events`, event);
  } catch (error) {
    console.log(error);
  }
};

app.post('/events', async (req, res) => {
  try {
    const { type, data } = req.body;
    await handleEvent(type, data);
    res.send();
  } catch (error) {
    console.log(error);
  }
});

app.get('/all-events', (req, res) => {
  res.send(allEvents);
});

const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT;

app.listen(EVENT_BUS_PORT, () => {
  console.log(`event bus server is running on port ${EVENT_BUS_PORT}`);
});
