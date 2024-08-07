import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ConsultaSintomaAttributes {
  consulta_id: number;
  síntoma_id: number;
  estado?: string;
  usr_creacion?: string;
  usr_modificacion?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

interface ConsultaSintomaCreationAttributes extends Optional<ConsultaSintomaAttributes, 'estado' | 'usr_creacion' | 'usr_modificacion' | 'fecha_creacion' | 'fecha_modificacion'> {}

class ConsultaSintoma extends Model<ConsultaSintomaAttributes, ConsultaSintomaCreationAttributes> implements ConsultaSintomaAttributes {
  public consulta_id!: number;
  public síntoma_id!: number;
  public estado?: string;
  public usr_creacion?: string;
  public usr_modificacion?: string;
  public fecha_creacion?: Date;
  public fecha_modificacion?: Date;
}

ConsultaSintoma.init({
  consulta_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'consulta',
      key: 'id_consulta',
    },
  },
  síntoma_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'síntoma',
      key: 'id_síntoma',
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
  tableName: 'consulta_síntoma',
  timestamps: false,
});

export { ConsultaSintoma, ConsultaSintomaAttributes, ConsultaSintomaCreationAttributes };

export default ConsultaSintoma;