const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

const POST_PORT = process.env.POST_PORT;
const COMMET_PORT = process.env.COMMET_PORT;
const MODERATION_PORT = process.env.MODERATION_PORT;
const QUERY_PORT = process.env.QUERY_PORT;
const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT;

const isKubernetesEnable = true;

const base_url = {
  post: isKubernetesEnable
    ? `http://post-service:${POST_PORT}/`
    : `http://localhost:${POST_PORT}/`,
  comment: isKubernetesEnable
    ? `http://comment-service:${POST_PORT}/`
    : `http://localhost:${COMMET_PORT}/`,
  moderation: isKubernetesEnable
    ? `http://moderation-service:${POST_PORT}/`
    : `http://localhost:${MODERATION_PORT}/`,
  query: isKubernetesEnable
    ? `http://query-service:${POST_PORT}/`
    : `http://localhost:${QUERY_PORT}/`,
  eventBus: isKubernetesEnable
    ? `http://event-bus-service:${POST_PORT}/`
    : `http://localhost:${EVENT_BUS_PORT}/`,
};

export default base_url;
