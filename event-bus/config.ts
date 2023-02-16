const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

const POST_PORT = process.env.POST_PORT;
const COMMET_PORT = process.env.COMMET_PORT;
const MODERATION_PORT = process.env.MODERATION_PORT;
const QUERY_PORT = process.env.QUERY_PORT;
const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT;

const base_url = {
  post: `http://localhost:${POST_PORT}/`,
  comment: `http://localhost:${COMMET_PORT}/`,
  moderation: `http://localhost:${MODERATION_PORT}/`,
  query: `http://localhost:${QUERY_PORT}/`,
  eventBus: `http://localhost:${EVENT_BUS_PORT}/`,
};

export default base_url;
