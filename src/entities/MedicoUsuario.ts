import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MedicoUsuarioAttributes {
  medico_id: number;
  usuario_id: number;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

interface MedicoUsuarioCreationAttributes extends Optional<MedicoUsuarioAttributes, 'medico_id' | 'usuario_id'> {}

class MedicoUsuario extends Model<MedicoUsuarioAttributes, MedicoUsuarioCreationAttributes> implements MedicoUsuarioAttributes {
  public medico_id!: number;
  public usuario_id!: number;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion?: Date;
  public fecha_modificacion?: Date;
}

MedicoUsuario.init({
  medico_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  tableName: 'medico_usuario',
  schema: 'db_diagnostic',
  timestamps: false,
});

export { MedicoUsuario, MedicoUsuarioAttributes, MedicoUsuarioCreationAttributes };

export default MedicoUsuario;