import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ConsultaAttributes {
  id_consulta: number;
  fecha_hora: Date;
  descripción?: string;
  documento?: string;
  usuario_id?: number;
  medico_id?: number;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

interface ConsultaCreationAttributes extends Optional<ConsultaAttributes, 'id_consulta'> {}

class Consulta extends Model<ConsultaAttributes, ConsultaCreationAttributes> implements ConsultaAttributes {
  public id_consulta!: number;
  public fecha_hora!: Date;
  public descripción?: string;
  public documento?: string;
  public usuario_id?: number;
  public medico_id?: number;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion?: Date;
  public fecha_modificacion?: Date;
}

Consulta.init({
  id_consulta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descripción: {
    type: DataTypes.TEXT,
  },
  documento: {
    type: DataTypes.STRING(255),
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuario',
      key: 'id_usuario',
    },
  },
  medico_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'médico',
      key: 'id_medico',
    },
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
  tableName: 'consulta',
  timestamps: false,
});

export { Consulta, ConsultaAttributes, ConsultaCreationAttributes };

export default Consulta;