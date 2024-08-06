import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CitaAttributes {
  id_cita: number;
  fecha_hora: Date;
  estado?: string;
  usuario_id?: number;
  medico_id?: number;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

interface CitaCreationAttributes extends Optional<CitaAttributes, 'id_cita'> {}

class Cita extends Model<CitaAttributes, CitaCreationAttributes> implements CitaAttributes {
  public id_cita!: number;
  public fecha_hora!: Date;
  public estado?: string;
  public usuario_id?: number;
  public medico_id?: number;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion?: Date;
  public fecha_modificacion?: Date;
}

Cita.init({
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(50),
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
  tableName: 'cita',
  timestamps: false,
});

export { Cita, CitaAttributes, CitaCreationAttributes };

export default Cita;