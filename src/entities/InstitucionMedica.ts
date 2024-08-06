import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface InstitucionMedicaAttributes {
  id_institucion_medica: number;
  nombre: string;
  dirección?: string;
  teléfono?: string;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
  coordenada_x?:string;
  coordenada_y?:string;
}

interface InstitucionMedicaCreationAttributes extends Optional<InstitucionMedicaAttributes, 'id_institucion_medica'> {}

class InstitucionMedica extends Model<InstitucionMedicaAttributes, InstitucionMedicaCreationAttributes> implements InstitucionMedicaAttributes {
  public id_institucion_medica!: number;
  public nombre!: string;
  public dirección?: string;
  public teléfono?: string;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion?: Date;
  public fecha_modificacion?: Date;
  public coordenada_x?:string;
  public coordenada_y?:string;
}

InstitucionMedica.init({
  id_institucion_medica: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dirección: {
    type: DataTypes.STRING(255),
  },
  teléfono: {
    type: DataTypes.STRING(20),
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
  coordenada_x: {
    type: DataTypes.STRING(100),
  },
  coordenada_y: {
      type: DataTypes.STRING(100),
  },
}, {
  sequelize,
  tableName: 'institución_medica',
  timestamps: false,
});



export { InstitucionMedica, InstitucionMedicaAttributes, InstitucionMedicaCreationAttributes };

export default InstitucionMedica;