import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ConsultaEnfermedadAttributes {
  consulta_id: number;
  enfermedad_id: number;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export interface ConsultaEnfermedadCreationAttributes extends Optional<ConsultaEnfermedadAttributes, 'fecha_creacion' | 'fecha_modificacion'> {}

class ConsultaEnfermedad extends Model<ConsultaEnfermedadAttributes, ConsultaEnfermedadCreationAttributes> implements ConsultaEnfermedadAttributes {
  public consulta_id!: number;
  public enfermedad_id!: number;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion!: Date;
  public fecha_modificacion!: Date;
}

ConsultaEnfermedad.init({
  consulta_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  enfermedad_id: {
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
  tableName: 'consulta_enfermedad',
  schema: 'db_diagnostic',
  timestamps: false,
});

export default ConsultaEnfermedad;