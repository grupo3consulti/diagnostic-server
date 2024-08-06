import InstitucionMedicaRepository from '../repositories/institucionMedicaRepository';
import InstitucionMedica from '../entities/InstitucionMedica';
import { InstitucionMedicaCreationAttributes } from '../entities/InstitucionMedica';

class InstitucionMedicaService {
  async createInstitucionMedica(institucionMedicaData: InstitucionMedicaCreationAttributes): Promise<InstitucionMedica> {
    return await InstitucionMedicaRepository.create(institucionMedicaData);
  }

  async getAllInstitucionesMedicas(): Promise<InstitucionMedica[]> {
    return await InstitucionMedicaRepository.findAll();
  }

  async getInstitucionMedicaById(id: number): Promise<InstitucionMedica | null> {
    return await InstitucionMedicaRepository.findById(id);
  }

  async getInstitucionesMedicasByParams(params: Partial<InstitucionMedicaCreationAttributes>): Promise<InstitucionMedica[]> {
    return await InstitucionMedicaRepository.findByParams(params);
  }

  async getOneInstitucionMedicaByParams(params: Partial<InstitucionMedicaCreationAttributes>): Promise<InstitucionMedica | null> {
    return await InstitucionMedicaRepository.findOneByParams(params);
  }

  async updateInstitucionMedica(id: number, updates: Partial<InstitucionMedicaCreationAttributes>): Promise<[number, InstitucionMedica[]]> {
    return await InstitucionMedicaRepository.update(id, updates);
  }

  async deleteInstitucionMedica(id: number): Promise<[number, InstitucionMedica[]]> {
    return await InstitucionMedicaRepository.delete(id);
  }
}

export default new InstitucionMedicaService();