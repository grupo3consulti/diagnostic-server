import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EnfermedadAttributes {
  id_enfermedad: number;
  nombre: string;
  tipo: string;
  descripcion?: string;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export interface EnfermedadCreationAttributes extends Optional<EnfermedadAttributes, 'id_enfermedad' | 'fecha_creacion' | 'fecha_modificacion'> {}

class Enfermedad extends Model<EnfermedadAttributes, EnfermedadCreationAttributes> implements EnfermedadAttributes {
  public id_enfermedad!: number;
  public nombre!: string;
  public tipo!: string;
  public descripcion?: string;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion!: Date;
  public fecha_modificacion!: Date;
}

Enfermedad.init({
  id_enfermedad: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
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
  tableName: 'enfermedad',
  schema: 'db_diagnostic',
  timestamps: false,
});

export default Enfermedad;