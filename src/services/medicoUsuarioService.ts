import MedicoUsuarioRepository from '../repositories/medicoUsuarioRepository';
import MedicoUsuario from '../entities/MedicoUsuario';
import { MedicoUsuarioCreationAttributes } from '../entities/MedicoUsuario';

class MedicoUsuarioService {
  async createMedicoUsuario(medicoUsuarioData: MedicoUsuarioCreationAttributes): Promise<MedicoUsuario> {
    return await MedicoUsuarioRepository.create(medicoUsuarioData);
  }

  async getAllMedicoUsuarios(): Promise<MedicoUsuario[]> {
    return await MedicoUsuarioRepository.findAll();
  }

  async getMedicoUsuarioById(medico_id: number, usuario_id: number): Promise<MedicoUsuario | null> {
    return await MedicoUsuarioRepository.findById(medico_id, usuario_id);
  }

  async getMedicoUsuariosByParams(params: Partial<MedicoUsuarioCreationAttributes>): Promise<MedicoUsuario[]> {
    return await MedicoUsuarioRepository.findByParams(params);
  }

  async getOneMedicoUsuarioByParams(params: Partial<MedicoUsuarioCreationAttributes>): Promise<MedicoUsuario | null> {
    return await MedicoUsuarioRepository.findOneByParams(params);
  }

  async updateMedicoUsuario(medico_id: number, usuario_id: number, updates: Partial<MedicoUsuarioCreationAttributes>): Promise<[number, MedicoUsuario[]]> {
    return await MedicoUsuarioRepository.update(medico_id, usuario_id, updates);
  }

  async deleteMedicoUsuario(medico_id: number, usuario_id: number): Promise<[number, MedicoUsuario[]]> {
    return await MedicoUsuarioRepository.delete(medico_id, usuario_id);
  }
}

export default new MedicoUsuarioService();