import SintomaRepository from '../repositories/sintomaRepository';
import Sintoma from '../entities/Sintoma';
import { SintomaCreationAttributes } from '../entities/Sintoma';

class SintomaService {
  async createSintoma(sintomaData: SintomaCreationAttributes): Promise<Sintoma> {
    return await SintomaRepository.create(sintomaData);
  }

  async getAllSintomas(): Promise<Sintoma[]> {
    return await SintomaRepository.findAll();
  }

  async getSintomaById(id: number): Promise<Sintoma | null> {
    return await SintomaRepository.findById(id);
  }

  async getSintomasByParams(params: Partial<SintomaCreationAttributes>): Promise<Sintoma[]> {
    return await SintomaRepository.findByParams(params);
  }

  async getOneSintomaByParams(params: Partial<SintomaCreationAttributes>): Promise<Sintoma | null> {
    return await SintomaRepository.findOneByParams(params);
  }

  async updateSintoma(id: number, updates: Partial<SintomaCreationAttributes>): Promise<[number, Sintoma[]]> {
    return await SintomaRepository.update(id, updates);
  }

  async deleteSintoma(id: number): Promise<[number, Sintoma[]]> {
    return await SintomaRepository.delete(id);
  }
}

export default new SintomaService();