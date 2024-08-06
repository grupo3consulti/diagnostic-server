import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/database';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

dotenv.config();


const app = express();

app.use(express.json());
app.use('/diagnostic', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error: Error) => {
  console.error('Unable to connect to the database:', error);
});
