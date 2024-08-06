import ConsultaAuditoriaRepository from '../repositories/consultaAuditoriaRepository';
import ConsultaAuditoria from '../entities/ConsultaAuditoria';
import { ConsultaAuditoriaCreationAttributes } from '../entities/ConsultaAuditoria';

class ConsultaAuditoriaService {
  async createConsultaAuditoria(consultaAuditoriaData: ConsultaAuditoriaCreationAttributes): Promise<ConsultaAuditoria> {
    return await ConsultaAuditoriaRepository.create(consultaAuditoriaData);
  }

  async getAllConsultaAuditorias(): Promise<ConsultaAuditoria[]> {
    return await ConsultaAuditoriaRepository.findAll();
  }

  async getConsultaAuditoriaById(id: number): Promise<ConsultaAuditoria | null> {
    return await ConsultaAuditoriaRepository.findById(id);
  }

  async getConsultaAuditoriasByParams(params: Partial<ConsultaAuditoriaCreationAttributes>): Promise<ConsultaAuditoria[]> {
    return await ConsultaAuditoriaRepository.findByParams(params);
  }

  async getOneConsultaAuditoriaByParams(params: Partial<ConsultaAuditoriaCreationAttributes>): Promise<ConsultaAuditoria | null> {
    return await ConsultaAuditoriaRepository.findOneByParams(params);
  }

  async updateConsultaAuditoria(id: number, updates: Partial<ConsultaAuditoriaCreationAttributes>): Promise<[number, ConsultaAuditoria[]]> {
    return await ConsultaAuditoriaRepository.update(id, updates);
  }

}

export default new ConsultaAuditoriaService();