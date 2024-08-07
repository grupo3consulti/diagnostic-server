import { Sequelize } from 'sequelize';
import enviroment from '../config/enviroment';

const databaseUrl = `postgresql://${enviroment.DB_USERNAME}:${enviroment.DB_PASSWORD}@${enviroment.DB_HOST}/${enviroment.DB_NAME}`;

let sequelize: Sequelize;

try {
  sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    schema: 'db_diagnostic'
  });

  sequelize.authenticate()
    .then(() => {
      console.log('Conexión a la base de datos exitosa.');
    })
    .catch((err: any) => {
      console.error('No se pudo conectar a la base de datos:', err);
    });
} catch (err: any) {
  console.error('Error al inicializar Sequelize:', err);
}

// @ts-ignore
export default sequelize;