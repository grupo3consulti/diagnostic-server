import ConsultaSintomaRepository from '../repositories/consultaSintomaRepository';
import ConsultaSintoma from '../entities/ConsultaSintoma';
import { ConsultaSintomaCreationAttributes } from '../entities/ConsultaSintoma';

class ConsultaSintomaService {
  async createConsultaSintoma(consultaSintomaData: ConsultaSintomaCreationAttributes): Promise<ConsultaSintoma> {
    return await ConsultaSintomaRepository.create(consultaSintomaData);
  }

  async getAllConsultaSintomas(): Promise<ConsultaSintoma[]> {
    return await ConsultaSintomaRepository.findAll();
  }

  async getConsultaSintomaById(consulta_id: number, sintoma_id: number): Promise<ConsultaSintoma | null> {
    return await ConsultaSintomaRepository.findById(consulta_id, sintoma_id);
  }

  async getConsultaSintomasByParams(params: Partial<ConsultaSintomaCreationAttributes>): Promise<ConsultaSintoma[]> {
    return await ConsultaSintomaRepository.findByParams(params);
  }

  async getOneConsultaSintomaByParams(params: Partial<ConsultaSintomaCreationAttributes>): Promise<ConsultaSintoma | null> {
    return await ConsultaSintomaRepository.findOneByParams(params);
  }

  async updateConsultaSintoma(consulta_id: number, sintoma_id: number, updates: Partial<ConsultaSintomaCreationAttributes>): Promise<[number, ConsultaSintoma[]]> {
    return await ConsultaSintomaRepository.update(consulta_id, sintoma_id, updates);
  }

  async deleteConsultaSintoma(consulta_id: number, sintoma_id: number): Promise<[number, ConsultaSintoma[]]> {
    return await ConsultaSintomaRepository.delete(consulta_id, sintoma_id);
  }
}

export default new ConsultaSintomaService();