import MedicoUsuario from '../entities/MedicoUsuario';
import { MedicoUsuarioCreationAttributes } from '../entities/MedicoUsuario';

class MedicoUsuarioRepository {
  async create(medicoUsuario: MedicoUsuarioCreationAttributes): Promise<MedicoUsuario> {
    return await MedicoUsuario.create(medicoUsuario);
  }

  async findAll(): Promise<MedicoUsuario[]> {
    return await MedicoUsuario.findAll();
  }

  async findById(medico_id: number, usuario_id: number): Promise<MedicoUsuario | null> {
    return await MedicoUsuario.findOne({ where: { medico_id, usuario_id } });
  }

  async findByParams(params: Partial<MedicoUsuarioCreationAttributes>): Promise<MedicoUsuario[]> {
    return await MedicoUsuario.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<MedicoUsuarioCreationAttributes>): Promise<MedicoUsuario | null> {
    return await MedicoUsuario.findOne({
      where: {
        ...params
      }
    });
  }

  async update(medico_id: number, usuario_id: number, updates: Partial<MedicoUsuarioCreationAttributes>): Promise<[number, MedicoUsuario[]]> {
    return await MedicoUsuario.update(updates, {
      where: { medico_id, usuario_id },
      returning: true
    });
  }

  async delete(medico_id: number, usuario_id: number): Promise<[number, MedicoUsuario[]]> {
    return await MedicoUsuario.update({ estado: 'Eliminado' }, {
      where: { medico_id, usuario_id },
      returning: true
    });
  }
}

export default new MedicoUsuarioRepository();