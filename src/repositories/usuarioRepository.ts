import Usuario from '../entities/Usuario';
import { UsuarioCreationAttributes } from '../entities/Usuario';

class UsuarioRepository {
  async create(usuario: UsuarioCreationAttributes): Promise<Usuario> {
    return await Usuario.create(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await Usuario.findAll();
  }

  async findById(id: number): Promise<Usuario | null> {
    return await Usuario.findByPk(id);
  }

  async findByParams(params: Partial<UsuarioCreationAttributes>): Promise<Usuario[]> {
    return await Usuario.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<UsuarioCreationAttributes>): Promise<Usuario | null> {
    return await Usuario.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(id: number, updates: Partial<UsuarioCreationAttributes>): Promise<[number, Usuario[]]> {
    return await Usuario.update(updates, {
      where: { id_usuario: id },
      returning: true
    });
  }

  async delete(id: number): Promise<[number, Usuario[]]> {
    return await Usuario.update({ estado: 'Eliminado' }, {
      where: { id_usuario: id },
      returning: true
    });
  }

}

export default new UsuarioRepository();