import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProvinciaAttributes {
  id_provincia: number;
  nombre_provincia: string;
  pais_id: number;
  fe_creacion?: Date;
  usr_creacion: string;
  usr_modificacion?: string;
  fe_modificacion?: Date;
  estado?: string;
}

interface ProvinciaCreationAttributes extends Optional<ProvinciaAttributes, 'id_provincia' | 'fe_creacion' | 'usr_modificacion' | 'fe_modificacion' | 'estado'> {}

class Provincia extends Model<ProvinciaAttributes, ProvinciaCreationAttributes> implements ProvinciaAttributes {
  public id_provincia!: number;
  public nombre_provincia!: string;
  public pais_id!: number;
  public fe_creacion?: Date;
  public usr_creacion!: string;
  public usr_modificacion?: string;
  public fe_modificacion?: Date;
  public estado?: string;
}

Provincia.init({
  id_provincia: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_provincia: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  pais_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fe_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  usr_creacion: {
    type: DataTypes.STRING(100),
    allowNull: false,
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
  tableName: 'provincias',
  timestamps: false,
});

export { Provincia, ProvinciaAttributes, ProvinciaCreationAttributes };

export default Provincia;
