import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MedicoAttributes {
  id_medico: number;
  nombre: string;
  especialidad?: string;
  email: string;
  telefono?: string;
  institucion_medica_id?: number;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

interface MedicoCreationAttributes extends Optional<MedicoAttributes, 'id_medico'> {}

class Medico extends Model<MedicoAttributes, MedicoCreationAttributes> implements MedicoAttributes {
  public id_medico!: number;
  public nombre!: string;
  public especialidad?: string;
  public email!: string;
  public telefono?: string;
  public institucion_medica_id?: number;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion?: Date;
  public fecha_modificacion?: Date;
}

Medico.init({
  id_medico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  especialidad: {
    type: DataTypes.STRING(100),
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING(20),
    field: 'teléfono',
  },
  institucion_medica_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'institución_medica',
      key: 'id_institucion_medica',
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
  tableName: 'médico',
  timestamps: false,
});



export { Medico, MedicoAttributes, MedicoCreationAttributes };

export default Medico;