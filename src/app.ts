import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/database';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import enviroment  from './config/enviroment';

dotenv.config();


const app = express();

app.use(express.json());
app.use('/diagnostic', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
  app.listen(enviroment.PORT, () => {
    console.log('Server is running on port: ' + enviroment.PORT);
  });
}).catch((error: Error) => {
  console.error('Unable to connect to the database:', error);
});
