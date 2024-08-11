import Caso from '../entities/Caso';
import { CasoCreationAttributes } from '../entities/Caso';

class CasoRepository {
  async create(caso: CasoCreationAttributes): Promise<Caso> {
    return await Caso.create(caso);
  }

  async bulkCreate(casos: CasoCreationAttributes[]): Promise<Caso[]> {
    return await Caso.bulkCreate(casos);
  }

  async findAll(): Promise<Caso[]> {
    return await Caso.findAll();
  }

  async findById(id_caso: number): Promise<Caso | null> {
    return await Caso.findOne({
      where: { id_caso }
    });
  }

  async findByParams(params: Partial<CasoCreationAttributes>): Promise<Caso[]> {
    return await Caso.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<CasoCreationAttributes>): Promise<Caso | null> {
    return await Caso.findOne({
      where: {
        ...params
      }
    });
  }

  async update(id_caso: number, updates: Partial<CasoCreationAttributes>): Promise<[number, Caso[]]> {
    return await Caso.update(updates, {
      where: { id_caso },
      returning: true
    });
  }

  async delete(id_caso: number): Promise<[number, Caso[]]> {
    return await Caso.update({ estado: 'Eliminado' }, {
      where: { id_caso },
      returning: true
    });
  }
}

export default new CasoRepository();
