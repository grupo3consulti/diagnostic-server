import MedicoRepository from '../repositories/medicoRepository';
import Medico from '../entities/Medico';
import { MedicoCreationAttributes } from '../entities/Medico';

class MedicoService {
  async createMedico(medicoData: MedicoCreationAttributes): Promise<Medico> {
    return await MedicoRepository.create(medicoData);
  }

  async getAllMedicos(): Promise<Medico[]> {
    return await MedicoRepository.findAll();
  }

  async getMedicoById(id: number): Promise<Medico | null> {
    return await MedicoRepository.findById(id);
  }

  async getMedicosByParams(params: Partial<MedicoCreationAttributes>): Promise<Medico[]> {
    return await MedicoRepository.findByParams(params);
  }

  async getOneMedicoByParams(params: Partial<MedicoCreationAttributes>): Promise<Medico | null> {
    return await MedicoRepository.findOneByParams(params);
  }

  async updateMedico(id: number, updates: Partial<MedicoCreationAttributes>): Promise<[number, Medico[]]> {
    return await MedicoRepository.update(id, updates);
  }

  async deleteMedico(id: number): Promise<[number, Medico[]]> {
    return await MedicoRepository.delete(id);
  }
}

export default new MedicoService();