const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const app = express();
const fetcher = axios.create({
  baseURL: 'https://api.twitter.com',
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', (req, res) => {
  const method = req.method;
  const body = req.body;
  const url = req.url;
  const headers = req.headers;

  switch (method) {
    case 'POST':
      fetcher
        .post(url, body, {
          headers: {
            authorization: headers.authorization,
          },
        })
        .then((response) => {
          res.json(response.data);
        })
        .catch((error) => {
          console.error(error);
          res.status(400).send(error.message);
        });
      break;
    case 'GET':
      fetcher
        .get(url, {
          headers: {
            authorization: headers.authorization,
          },
        })
        .then((response) => {
          res.json(response.data);
        })
        .catch((error) => {
          console.error(error);
          res.status(400).send(error.message);
        });
      break;
    default:
      res.status(400).send('Method not supported yet');
  }
});

app.listen(3001, () => {
  console.info('Server running on 3001');
});
