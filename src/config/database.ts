import { Sequelize } from 'sequelize';

const databaseUrl = 'postgresql://bksoft_user:pkxjSM5WM8BnwMzYDBnhmLdkMCq0Eeoo@dpg-cq1bk3mehbks73f6va70-a.oregon-postgres.render.com/bksoft';

const sequelize = new Sequelize(databaseUrl, {
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

// Probar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch((err: any) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

export default sequelize;