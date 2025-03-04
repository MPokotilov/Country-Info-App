import express from 'express';
import dotenv from 'dotenv';
import countriesRouter from './routes/countries';
import usersRouter from './routes/users';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();
console.log('COUNTRIES_NOW_API_BASE:', process.env.COUNTRIES_NOW_API_BASE);
console.log('NAGER_API_BASE:', process.env.NAGER_API_BASE);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/countries', countriesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Country Info App API is running');
});

// Подключаем middleware для обработки ошибок
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});