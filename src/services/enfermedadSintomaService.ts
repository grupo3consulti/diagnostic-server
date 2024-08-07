import EnfermedadSintomaRepository from '../repositories/enfermedadSintomaRepository';
import EnfermedadSintoma, { EnfermedadSintomaCreationAttributes } from '../entities/EnfermedadSintoma';

class EnfermedadSintomaService {
  async create(enfermedadSintoma: EnfermedadSintomaCreationAttributes): Promise<EnfermedadSintoma> {
    return await EnfermedadSintomaRepository.create(enfermedadSintoma);
  }

  async findAll(): Promise<EnfermedadSintoma[]> {
    return await EnfermedadSintomaRepository.findAll();
  }

  async findById(enfermedad_id: number, sintoma_id: number): Promise<EnfermedadSintoma | null> {
    return await EnfermedadSintomaRepository.findById(enfermedad_id, sintoma_id);
  }

  async findByParams(params: Partial<EnfermedadSintomaCreationAttributes>): Promise<EnfermedadSintoma[]> {
    return await EnfermedadSintomaRepository.findByParams(params);
  }

  async findOneByParams(params: Partial<EnfermedadSintomaCreationAttributes>): Promise<EnfermedadSintoma | null> {
    return await EnfermedadSintomaRepository.findOneByParams(params);
  }

  async update(enfermedad_id: number, sintoma_id: number, updates: Partial<EnfermedadSintomaCreationAttributes>): Promise<[number, EnfermedadSintoma[]]> {
    return await EnfermedadSintomaRepository.update(enfermedad_id, sintoma_id, updates);
  }

  async delete(enfermedad_id: number, sintoma_id: number): Promise<[number, EnfermedadSintoma[]]> {
    return await EnfermedadSintomaRepository.delete(enfermedad_id, sintoma_id);
  }
}

export default new EnfermedadSintomaService();