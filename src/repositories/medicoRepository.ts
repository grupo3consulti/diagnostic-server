import Medico from '../entities/Medico';
import { MedicoCreationAttributes } from '../entities/Medico';
import InstitucionMedica from "../entities/InstitucionMedica";

class MedicoRepository {
  async create(medico: MedicoCreationAttributes): Promise<Medico> {
    return await Medico.create(medico);
  }

  async findAll(): Promise<Medico[]> {
    return await Medico.findAll();
  }

  async findById(id: number): Promise<Medico | null> {
    return await Medico.findByPk(id);
  }

  async findByParams(params: Partial<MedicoCreationAttributes>): Promise<Medico[]> {
    return await Medico.findAll({
      where: params
    });
  }

  async findOneByParams(params: Partial<MedicoCreationAttributes>): Promise<Medico | null> {
    return await Medico.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(id: number, updates: Partial<MedicoCreationAttributes>): Promise<[number, Medico[]]> {
    return await Medico.update(updates, {
      where: { id_medico: id },
      returning: true
    });
  }

  async delete(id: number): Promise<[number, Medico[]]> {
    return await Medico.update({ estado: 'Eliminado' }, {
      where: { id_medico: id },
      returning: true
    });
  }
}

export default new MedicoRepository();