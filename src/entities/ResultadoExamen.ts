import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ResultadoExamenAttributes {
  id_resultado_examen: number;
  nombre: string;
  descripcion?: string;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export interface ResultadoExamenCreationAttributes extends Optional<ResultadoExamenAttributes, 'id_resultado_examen' | 'fecha_creacion' | 'fecha_modificacion'> {}

class ResultadoExamen extends Model<ResultadoExamenAttributes, ResultadoExamenCreationAttributes> implements ResultadoExamenAttributes {
  public id_resultado_examen!: number;
  public nombre!: string;
  public descripcion?: string;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion!: Date;
  public fecha_modificacion!: Date;
}

ResultadoExamen.init({
  id_resultado_examen: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
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
  tableName: 'resultado_examen',
  schema: 'db_diagnostic',
  timestamps: false,
});

export default ResultadoExamen;