import Sintoma from '../entities/Sintoma';
import { SintomaCreationAttributes } from '../entities/Sintoma';

class SintomaRepository {
  async create(sintoma: SintomaCreationAttributes): Promise<Sintoma> {
    return await Sintoma.create(sintoma);
  }

  async findAll(): Promise<Sintoma[]> {
    return await Sintoma.findAll();
  }

  async findById(id: number): Promise<Sintoma | null> {
    return await Sintoma.findByPk(id);
  }

  async findByParams(params: Partial<SintomaCreationAttributes>): Promise<Sintoma[]> {
    return await Sintoma.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<SintomaCreationAttributes>): Promise<Sintoma | null> {
    return await Sintoma.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(id: number, updates: Partial<SintomaCreationAttributes>): Promise<[number, Sintoma[]]> {
    return await Sintoma.update(updates, {
      where: { id_sintoma: id },
      returning: true
    });
  }

  async delete(id: number): Promise<[number, Sintoma[]]> {
    return await Sintoma.update({ estado: 'Eliminado' }, {
      where: { id_sintoma: id },
      returning: true
    });
  }
}

export default new SintomaRepository();