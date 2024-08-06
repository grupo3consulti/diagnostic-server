import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ParametroCab extends Model {
  public id_parametro_cab!: number;
  public descripcion!: string;
  public estado!: string;
  public usr_creacion!: string;
  public usr_modificacion!: string;
  public fecha_creacion!: Date;
  public fecha_modificacion!: Date;
}

ParametroCab.init({
  id_parametro_cab: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(50),
  },
  usr_creacion: {
    type: DataTypes.STRING(100),
  },
  usr_modificacion: {
    type: DataTypes.STRING(100),
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fecha_modificacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'parametro_cab',
  schema: 'db_diagnostic',
  timestamps: false,
});

export default ParametroCab;