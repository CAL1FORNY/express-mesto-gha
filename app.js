const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, BASE_PATH = 'localhost' } = process.env;
const { ERROR_NOT_FOUND } = require('./utils/errors');
const app = express();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const mongoDB = 'mongodb://127.0.0.1:27017/mestodb';
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '657605f301eb9ee76fae77c2' };
  next();
});

app.use('/cards', cardRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`http://${BASE_PATH}:${PORT}`);
});