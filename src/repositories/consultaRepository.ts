import Consulta from '../entities/Consulta';
import { ConsultaCreationAttributes } from '../entities/Consulta';

class ConsultaRepository {
  async create(consulta: ConsultaCreationAttributes): Promise<Consulta> {
    return await Consulta.create(consulta);
  }

  async findAll(): Promise<Consulta[]> {
    return await Consulta.findAll();
  }

  async findById(id: number): Promise<Consulta | null> {
    return await Consulta.findByPk(id);
  }

  async findByParams(params: Partial<ConsultaCreationAttributes>): Promise<Consulta[]> {
    return await Consulta.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<ConsultaCreationAttributes>): Promise<Consulta | null> {
    return await Consulta.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(id: number, updates: Partial<ConsultaCreationAttributes>): Promise<[number, Consulta[]]> {
    return await Consulta.update(updates, {
      where: { id_consulta: id },
      returning: true
    });
  }

  async delete(id: number): Promise<[number, Consulta[]]> {
    return await Consulta.update({ estado: 'Eliminado' }, {
      where: { id_consulta: id },
      returning: true
    });
  }
}

export default new ConsultaRepository();