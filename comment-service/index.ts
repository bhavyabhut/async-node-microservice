import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(4002, () => {
  console.log('server is running on port 4002');
});
