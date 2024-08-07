import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ConsultaAuditoriaAttributes {
  id_auditoria: number;
  consulta_id: number;
  documento_auditoria?: string;
  prediagnostico?: string;
  fecha_creacion?: Date;
  usr_creacion?: string;
}

interface ConsultaAuditoriaCreationAttributes extends Optional<ConsultaAuditoriaAttributes, 'id_auditoria'> {}

class ConsultaAuditoria extends Model<ConsultaAuditoriaAttributes, ConsultaAuditoriaCreationAttributes> implements ConsultaAuditoriaAttributes {
  public id_auditoria!: number;
  public consulta_id!: number;
  public documento_auditoria?: string;
  public prediagnostico?: string;
  public fecha_creacion?: Date;
  public usr_creacion?: string;
}

ConsultaAuditoria.init({
  id_auditoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  consulta_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'consulta',
      key: 'id_consulta',
    },
  },
  documento_auditoria: {
    type: DataTypes.STRING(255),
  },
  prediagnostico: {
    type: DataTypes.TEXT,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  usr_creacion: {
    type: DataTypes.STRING(100),
  },
}, {
  sequelize,
  tableName: 'consulta_auditoria',
  timestamps: false,
});

export { ConsultaAuditoria, ConsultaAuditoriaAttributes, ConsultaAuditoriaCreationAttributes };

export default ConsultaAuditoria;