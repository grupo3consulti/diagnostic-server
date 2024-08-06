import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/database';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', routes);

sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error: Error) => {
  console.error('Unable to connect to the database:', error);
});
