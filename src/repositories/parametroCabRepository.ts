import ParametroCab from '../entities/ParametroCab';

class ParametroCabRepository {
  async create(parametroCab: Partial<ParametroCab>): Promise<ParametroCab> {
    return await ParametroCab.create(parametroCab);
  }

  async findAll(): Promise<ParametroCab[]> {
    return await ParametroCab.findAll();
  }

  async findById(id: number): Promise<ParametroCab | null> {
    return await ParametroCab.findByPk(id);
  }

  async update(id: number, updates: Partial<ParametroCab>): Promise<[number, ParametroCab[]]> {
    return await ParametroCab.update(updates, {
      where: { id_parametro_cab: id },
      returning: true,
    });
  }

  async delete(id: number): Promise<[number, ParametroCab[]]> {
    return await ParametroCab.update({ estado: 'Eliminado' }, {
      where: { id_parametro_cab: id },
      returning: true,
    });
  }

  async findOneByParams(params: Partial<ParametroCab>): Promise<ParametroCab | null> {
    return await ParametroCab.findOne({
      where: {
        ...params
      }
    });
  }
}

export default new ParametroCabRepository();