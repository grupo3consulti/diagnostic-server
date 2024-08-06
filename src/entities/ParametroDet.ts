import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ParametroCab from './ParametroCab';

class ParametroDet extends Model {
  public id_parametro_det!: number;
  public parametro_cab_id!: number;
  public clave!: string;
  public valor!: string;
  public estado!: string;
  public usr_creacion!: string;
  public usr_modificacion!: string;
  public fecha_creacion!: Date;
  public fecha_modificacion!: Date;
}

ParametroDet.init({
  id_parametro_det: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  parametro_cab_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ParametroCab,
      key: 'id_parametro_cab',
    },
  },
  clave: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  valor: {
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
  tableName: 'parametro_det',
  schema: 'db_diagnostic',
  timestamps: false,
});

export default ParametroDet;