import ConsultaRepository from '../repositories/consultaRepository';
import Consulta from '../entities/Consulta';
import { ConsultaCreationAttributes } from '../entities/Consulta';

class ConsultaService {
  async createConsulta(consultaData: ConsultaCreationAttributes): Promise<Consulta> {
    return await ConsultaRepository.create(consultaData);
  }

  async getAllConsultas(): Promise<Consulta[]> {
    return await ConsultaRepository.findAll();
  }

  async getConsultaById(id: number): Promise<Consulta | null> {
    return await ConsultaRepository.findById(id);
  }

  async getConsultasByParams(params: Partial<ConsultaCreationAttributes>): Promise<Consulta[]> {
    return await ConsultaRepository.findByParams(params);
  }

  async getOneConsultaByParams(params: Partial<ConsultaCreationAttributes>): Promise<Consulta | null> {
    return await ConsultaRepository.findOneByParams(params);
  }

  async updateConsulta(id: number, updates: Partial<ConsultaCreationAttributes>): Promise<[number, Consulta[]]> {
    return await ConsultaRepository.update(id, updates);
  }

  async deleteConsulta(id: number): Promise<[number, Consulta[]]> {
    return await ConsultaRepository.delete(id);
  }
}

export default new ConsultaService();