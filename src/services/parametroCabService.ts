import ParametroCabRepository from '../repositories/parametroCabRepository';
import ParametroCab from '../entities/ParametroCab';

class ParametroCabService {
  async createParametroCab(parametroCabData: Partial<ParametroCab>): Promise<ParametroCab> {
    return await ParametroCabRepository.create(parametroCabData);
  }

  async getAllParametroCabs(): Promise<ParametroCab[]> {
    return await ParametroCabRepository.findAll();
  }

  async getParametroCabById(id: number): Promise<ParametroCab | null> {
    return await ParametroCabRepository.findById(id);
  }

  async updateParametroCab(id: number, updates: Partial<ParametroCab>): Promise<[number, ParametroCab[]]> {
    return await ParametroCabRepository.update(id, updates);
  }

  async deleteParametroCab(id: number): Promise<[number, ParametroCab[]]> {
    return await ParametroCabRepository.delete(id);
  }

  async findOneByParams(params: Partial<ParametroCab>): Promise<ParametroCab | null> {
    return await ParametroCabRepository.findOneByParams(params);
  }
}

export default new ParametroCabService();