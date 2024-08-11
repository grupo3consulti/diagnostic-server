import CasoRepository from '../repositories/casoRepository';
import Caso, { CasoCreationAttributes } from '../entities/Caso';

class CasoService {
  async create(caso: CasoCreationAttributes): Promise<Caso> {
    return await CasoRepository.create(caso);
  }

  async findAll(): Promise<Caso[]> {
    return await CasoRepository.findAll();
  }

  async findById(id_caso: number): Promise<Caso | null> {
    return await CasoRepository.findById(id_caso);
  }

  async findByParams(params: Partial<CasoCreationAttributes>): Promise<Caso[]> {
    return await CasoRepository.findByParams(params);
  }

  async findOneByParams(params: Partial<CasoCreationAttributes>): Promise<Caso | null> {
    return await CasoRepository.findOneByParams(params);
  }

  async update(id_caso: number, updates: Partial<CasoCreationAttributes>): Promise<[number, Caso[]]> {
    return await CasoRepository.update(id_caso, updates);
  }

  async delete(id_caso: number): Promise<[number, Caso[]]> {
    return await CasoRepository.delete(id_caso);
  }
}

export default new CasoService();
