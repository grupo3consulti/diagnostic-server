import ProvinciaRepository from '../repositories/provinciaRepository';
import Provincia, { ProvinciaCreationAttributes } from '../entities/Provincia';

class ProvinciaService {
  async create(provincia: ProvinciaCreationAttributes): Promise<Provincia> {
    return await ProvinciaRepository.create(provincia);
  }

  async findAll(): Promise<Provincia[]> {
    return await ProvinciaRepository.findAll();
  }

  async findById(id_provincia: number): Promise<Provincia | null> {
    return await ProvinciaRepository.findById(id_provincia);
  }

  async findByParams(params: Partial<ProvinciaCreationAttributes>): Promise<Provincia[]> {
    return await ProvinciaRepository.findByParams(params);
  }

  async findOneByParams(params: Partial<ProvinciaCreationAttributes>): Promise<Provincia | null> {
    return await ProvinciaRepository.findOneByParams(params);
  }

  async update(id_provincia: number, updates: Partial<ProvinciaCreationAttributes>): Promise<[number, Provincia[]]> {
    return await ProvinciaRepository.update(id_provincia, updates);
  }

  async delete(id_provincia: number): Promise<[number, Provincia[]]> {
    return await ProvinciaRepository.delete(id_provincia);
  }
}

export default new ProvinciaService();
