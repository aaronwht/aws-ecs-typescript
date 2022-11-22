import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Express = express();
app.use(cors({ exposedHeaders: ['*', 'token'] }));
app.options('*', cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('dotenv').config();

app.get('/', async (req: Request, res: Response) => {
  return res.send({ error: false, v: 5, jwt: process.env.jwtSecret });
});

const server = app.listen(process.env.PORT || 8080);

if (process.env.NODE_ENV === 'production') {
  process.on('SIGINT', () => {
    server.close(() => {
      // close database
        process.exit(0);
    });
  });
}
