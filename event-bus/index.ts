import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

interface AllEvents {
  type: string;
  data: string;
}

const allEvents: AllEvents[] = [];

const handleEvent = (type: string, data: any) => {
  const event = { type, data };
  allEvents.push(event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);
  axios.post('http://localhost:4004/events', event);
};

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send();
});

app.get('/all-events', (req, res) => {
  res.send(allEvents);
});

app.listen(4005, () => {
  console.log('server is running on port 4005');
});
