import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EnfermedadSintomaAttributes {
  id_enfermedad_sintoma: number;
  enfermedad_id: number;
  sintoma_id: number;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export interface EnfermedadSintomaCreationAttributes extends Optional<EnfermedadSintomaAttributes, 'id_enfermedad_sintoma' | 'fecha_creacion' | 'fecha_modificacion'> {}

class EnfermedadSintoma extends Model<EnfermedadSintomaAttributes, EnfermedadSintomaCreationAttributes> implements EnfermedadSintomaAttributes {
  public id_enfermedad_sintoma!: number;
  public enfermedad_id!: number;
  public sintoma_id!: number;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion!: Date;
  public fecha_modificacion!: Date;
}

EnfermedadSintoma.init({
  id_enfermedad_sintoma: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  enfermedad_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  sintoma_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  tableName: 'enfermedad_sintoma',
  schema: 'db_diagnostic',
  timestamps: false,
});

export default EnfermedadSintoma;