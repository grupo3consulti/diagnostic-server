import EnfermedadRepository from '../repositories/enfermedadRepository';
import Enfermedad, { EnfermedadCreationAttributes } from '../entities/Enfermedad';

class EnfermedadService {
  async create(enfermedad: EnfermedadCreationAttributes): Promise<Enfermedad> {
    return await EnfermedadRepository.create(enfermedad);
  }

  async findAll(): Promise<Enfermedad[]> {
    return await EnfermedadRepository.findAll();
  }

  async findById(id: number): Promise<Enfermedad | null> {
    return await EnfermedadRepository.findById(id);
  }

  async findByParams(params: Partial<EnfermedadCreationAttributes>): Promise<Enfermedad[]> {
    return await EnfermedadRepository.findByParams(params);
  }

  async findOneByParams(params: Partial<EnfermedadCreationAttributes>): Promise<Enfermedad | null> {
    return await EnfermedadRepository.findOneByParams(params);
  }

  async update(id: number, updates: Partial<EnfermedadCreationAttributes>): Promise<[number, Enfermedad[]]> {
    return await EnfermedadRepository.update(id, updates);
  }

  async delete(id: number): Promise<[number, Enfermedad[]]> {
    return await EnfermedadRepository.delete(id);
  }
}

export default new EnfermedadService();