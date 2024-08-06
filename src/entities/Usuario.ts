import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsuarioAttributes {
  id_usuario: number;
  rol:string;
  nombre: string;
  email: string;
  contraseña: string;
  teléfono?: string;
  dirección?: string;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id_usuario'> {}

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  public id_usuario!: number;
  public rol!: string;
  public nombre!: string;
  public email!: string;
  public contraseña!: string;
  public teléfono?: string;
  public dirección?: string;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion?: Date;
  public fecha_modificacion?: Date;
}

Usuario.init({
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rol: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  teléfono: {
    type: DataTypes.STRING(20),
  },
  dirección: {
    type: DataTypes.STRING(255),
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
  tableName: 'usuario',
  timestamps: false,
});

export { Usuario, UsuarioAttributes, UsuarioCreationAttributes };

export default Usuario;