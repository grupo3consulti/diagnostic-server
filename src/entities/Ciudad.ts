import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CiudadAttributes {
  id_ciudad: number;
  nombre_ciudad: string;
  id_provincia: number;
  latitud?: number;
  longitud?: number;
  fe_creacion?: Date;
  usr_creacion?: string;
  usr_modificacion?: string;
  fe_modificacion?: Date;
  estado?: string;
}

interface CiudadCreationAttributes extends Optional<CiudadAttributes, 'id_ciudad' | 'latitud' | 'longitud' | 'fe_creacion' | 'usr_creacion' | 'usr_modificacion' | 'fe_modificacion' | 'estado'> {}

class Ciudad extends Model<CiudadAttributes, CiudadCreationAttributes> implements CiudadAttributes {
  public id_ciudad!: number;
  public nombre_ciudad!: string;
  public id_provincia!: number;
  public latitud?: number;
  public longitud?: number;
  public fe_creacion?: Date;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fe_modificacion?: Date;
  public estado?: string;
}

Ciudad.init({
  id_ciudad: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_ciudad: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_provincia: {
    type: DataTypes.INTEGER,
    references: {
      model: 'provincias',
      key: 'id_provincia',
    },
  },
  latitud: {
    type: DataTypes.DECIMAL(9, 6),
  },
  longitud: {
    type: DataTypes.DECIMAL(9, 6),
  },
  fe_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  usr_creacion: {
    type: DataTypes.STRING(100),
  },
  usr_modificacion: {
    type: DataTypes.STRING(100),
  },
  fe_modificacion: {
    type: DataTypes.DATE,
  },
  estado: {
    type: DataTypes.STRING(50),
    defaultValue: 'activo',
  },
}, {
  sequelize,
  tableName: 'ciudad',
  timestamps: false,
});

export { Ciudad, CiudadAttributes, CiudadCreationAttributes };

export default Ciudad;
