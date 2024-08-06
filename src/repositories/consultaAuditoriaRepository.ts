import ConsultaAuditoria from '../entities/ConsultaAuditoria';
import { ConsultaAuditoriaCreationAttributes } from '../entities/ConsultaAuditoria';

class ConsultaAuditoriaRepository {
  async create(consultaAuditoria: ConsultaAuditoriaCreationAttributes): Promise<ConsultaAuditoria> {
    return await ConsultaAuditoria.create(consultaAuditoria);
  }

  async findAll(): Promise<ConsultaAuditoria[]> {
    return await ConsultaAuditoria.findAll();
  }

  async findById(id: number): Promise<ConsultaAuditoria | null> {
    return await ConsultaAuditoria.findByPk(id);
  }

  async findByParams(params: Partial<ConsultaAuditoriaCreationAttributes>): Promise<ConsultaAuditoria[]> {
    return await ConsultaAuditoria.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<ConsultaAuditoriaCreationAttributes>): Promise<ConsultaAuditoria | null> {
    return await ConsultaAuditoria.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(id: number, updates: Partial<ConsultaAuditoriaCreationAttributes>): Promise<[number, ConsultaAuditoria[]]> {
    return await ConsultaAuditoria.update(updates, {
      where: { id_auditoria: id },
      returning: true
    });
  }

}

export default new ConsultaAuditoriaRepository();