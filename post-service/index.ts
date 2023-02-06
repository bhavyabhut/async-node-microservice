import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/post', (req, res) => {
  const body = req.body;
});

app.listen(4001, () => {
  console.log('server is running on port 4001');
});
