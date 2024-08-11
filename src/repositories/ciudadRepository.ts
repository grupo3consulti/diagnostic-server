import Ciudad from '../entities/Ciudad';
import { CiudadCreationAttributes } from '../entities/Ciudad';

class CiudadRepository {
  async create(ciudad: CiudadCreationAttributes): Promise<Ciudad> {
    return await Ciudad.create(ciudad);
  }

  async bulkCreate(ciudades: CiudadCreationAttributes[]): Promise<Ciudad[]> {
    return await Ciudad.bulkCreate(ciudades);
  }

  async findAll(): Promise<Ciudad[]> {
    return await Ciudad.findAll();
  }

  async findById(id_ciudad: number): Promise<Ciudad | null> {
    return await Ciudad.findOne({
      where: { id_ciudad }
    });
  }

  async findByParams(params: Partial<CiudadCreationAttributes>): Promise<Ciudad[]> {
    return await Ciudad.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<CiudadCreationAttributes>): Promise<Ciudad | null> {
    return await Ciudad.findOne({
      where: {
        ...params
      }
    });
  }

  async update(id_ciudad: number, updates: Partial<CiudadCreationAttributes>): Promise<[number, Ciudad[]]> {
    return await Ciudad.update(updates, {
      where: { id_ciudad },
      returning: true
    });
  }

  async delete(id_ciudad: number): Promise<[number, Ciudad[]]> {
    return await Ciudad.update({ estado: 'Eliminado' }, {
      where: { id_ciudad },
      returning: true
    });
  }
}

export default new CiudadRepository();
