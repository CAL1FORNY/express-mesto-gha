const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000, BASE_PATH = 'localhost' } = process.env;

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const mainRouter = require('./routes/mainRoute');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const responseHandler = require('./middlewares/response-handler');

const mongoDB = 'mongodb://127.0.0.1:27017/mestodb';
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);

app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(mainRouter);
app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => {
  console.log(`http://${BASE_PATH}:${PORT}`);
});
