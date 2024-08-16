import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/database';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import enviroment  from './config/enviroment';
import path from "path";
import cors from 'cors';
import morgan from 'morgan';

require('../scripts/crons/cron');

dotenv.config();


const app = express();

app.use(cors( {
            origin: '*', allowedHeaders: '*', methods: '*'
            }));

app.use(morgan('combined'));

app.use(express.json());
app.use('/diagnostic', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
  app.listen(enviroment.PORT, () => {
    console.log('Server is running on port: ' + enviroment.PORT);
  });
}).catch((error: Error) => {
  console.error('Unable to connect to the database:', error);
});
