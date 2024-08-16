import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SintomaAttributes {
  id_sintoma: number;
  descripcion: string;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

interface SintomaCreationAttributes extends Optional<SintomaAttributes, 'id_sintoma'> {}

class Sintoma extends Model<SintomaAttributes, SintomaCreationAttributes> implements SintomaAttributes {
  public id_sintoma!: number;
  public descripcion!: string;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion?: Date;
  public fecha_modificacion?: Date;
}

Sintoma.init({
  id_sintoma: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'descripción',
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
  tableName: 'síntoma',
  timestamps: false,
});

export { Sintoma, SintomaAttributes, SintomaCreationAttributes };

export default Sintoma;