import Provincia from '../entities/Provincia';
import { ProvinciaCreationAttributes } from '../entities/Provincia';

class ProvinciaRepository {
  async create(provincia: ProvinciaCreationAttributes): Promise<Provincia> {
    return await Provincia.create(provincia);
  }

  async bulkCreate(provincias: ProvinciaCreationAttributes[]): Promise<Provincia[]> {
    return await Provincia.bulkCreate(provincias);
  }

  async findAll(): Promise<Provincia[]> {
    return await Provincia.findAll();
  }

  async findById(id_provincia: number): Promise<Provincia | null> {
    return await Provincia.findOne({
      where: { id_provincia }
    });
  }

  async findByParams(params: Partial<ProvinciaCreationAttributes>): Promise<Provincia[]> {
    return await Provincia.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<ProvinciaCreationAttributes>): Promise<Provincia | null> {
    return await Provincia.findOne({
      where: {
        ...params
      }
    });
  }

  async update(id_provincia: number, updates: Partial<ProvinciaCreationAttributes>): Promise<[number, Provincia[]]> {
    return await Provincia.update(updates, {
      where: { id_provincia },
      returning: true
    });
  }

  async delete(id_provincia: number): Promise<[number, Provincia[]]> {
    return await Provincia.update({ estado: 'Eliminado' }, {
      where: { id_provincia },
      returning: true
    });
  }
}

export default new ProvinciaRepository();
