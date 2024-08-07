import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ResultadoExamenAttributes {
  id_resultado_examen: number;
  consulta_id: number;
  tipo_examen: string;
  resultado: string;
  estado: string;
  usr_creacion: string;
  usr_modificacion: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export interface ResultadoExamenCreationAttributes extends Optional<ResultadoExamenAttributes, 'id_resultado_examen' | 'fecha_creacion' | 'fecha_modificacion'> {}

class ResultadoExamen extends Model<ResultadoExamenAttributes, ResultadoExamenCreationAttributes> implements ResultadoExamenAttributes {
  public id_resultado_examen!: number;
  public consulta_id!: number;
  public tipo_examen!: string;
  public resultado!: string;
  public estado!: string;
  public usr_creacion!: string;
  public usr_modificacion!: string;
  public fecha_creacion!: Date;
  public fecha_modificacion!: Date;
}

ResultadoExamen.init({
  id_resultado_examen: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  consulta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'consulta', // Nombre de la tabla referenciada
      key: 'id_consulta',
    },
  },
  tipo_examen: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  resultado: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  usr_creacion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  usr_modificacion: {
    type: DataTypes.STRING(100),
    allowNull: true,
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