import CiudadRepository from '../repositories/ciudadRepository';
import Ciudad, { CiudadCreationAttributes } from '../entities/Ciudad';

class CiudadService {
  async create(ciudad: CiudadCreationAttributes): Promise<Ciudad> {
    return await CiudadRepository.create(ciudad);
  }

  async findAll(): Promise<Ciudad[]> {
    return await CiudadRepository.findAll();
  }

  async findById(id_ciudad: number): Promise<Ciudad | null> {
    return await CiudadRepository.findById(id_ciudad);
  }

  async findByParams(params: Partial<CiudadCreationAttributes>): Promise<Ciudad[]> {
    return await CiudadRepository.findByParams(params);
  }

  async findOneByParams(params: Partial<CiudadCreationAttributes>): Promise<Ciudad | null> {
    return await CiudadRepository.findOneByParams(params);
  }

  async update(id_ciudad: number, updates: Partial<CiudadCreationAttributes>): Promise<[number, Ciudad[]]> {
    return await CiudadRepository.update(id_ciudad, updates);
  }

  async delete(id_ciudad: number): Promise<[number, Ciudad[]]> {
    return await CiudadRepository.delete(id_ciudad);
  }
}

export default new CiudadService();
