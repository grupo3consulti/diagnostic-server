import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CasoAttributes {
  id_caso: number;
  id_enfermedad: number;
  id_ciudad: number;
  fecha_reporte?: Date;
  cantidad_casos?: number;
  fe_creacion?: Date;
  usr_creacion?: string;
  usr_modificacion?: string;
  fe_modificacion?: Date;
  estado?: string;
}

interface CasoCreationAttributes extends Optional<CasoAttributes, 'id_caso' | 'fecha_reporte' | 'cantidad_casos' | 'fe_creacion' | 'usr_creacion' | 'usr_modificacion' | 'fe_modificacion' | 'estado'> {}

class Caso extends Model<CasoAttributes, CasoCreationAttributes> implements CasoAttributes {
  public id_caso!: number;
  public id_enfermedad!: number;
  public id_ciudad!: number;
  public fecha_reporte?: Date;
  public cantidad_casos?: number;
  public fe_creacion?: Date;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fe_modificacion?: Date;
  public estado?: string;
}

Caso.init({
  id_caso: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_enfermedad: {
    type: DataTypes.INTEGER,
    references: {
      model: 'enfermedad',
      key: 'id_enfermedad',
    },
  },
  id_ciudad: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ciudad',
      key: 'id_ciudad',
    },
  },
  fecha_reporte: {
    type: DataTypes.DATE,
  },
  cantidad_casos: {
    type: DataTypes.INTEGER,
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
  tableName: 'casos',
  timestamps: false,
});

export { Caso, CasoAttributes, CasoCreationAttributes };

export default Caso;
