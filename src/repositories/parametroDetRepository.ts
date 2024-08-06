import ParametroCab from '../entities/ParametroCab';
import ParametroDet from '../entities/ParametroDet';
import { Op } from 'sequelize';

class ParametroDetRepository {
  async create(parametroDet: Partial<ParametroDet>): Promise<ParametroDet> {
    return await ParametroDet.create(parametroDet);
  }

  async findAll(): Promise<ParametroDet[]> {
    return await ParametroDet.findAll();
  }

  async findById(id: number): Promise<ParametroDet | null> {
    return await ParametroDet.findByPk(id);
  }

  async findByCabId(parametro_cab_id: number): Promise<ParametroDet[]> {
    return await ParametroDet.findAll({
      where: { parametro_cab_id },
    });
  }

  async update(id: number, updates: Partial<ParametroDet>): Promise<[number, ParametroDet[]]> {
    return await ParametroDet.update(updates, {
      where: { id_parametro_det: id },
      returning: true,
    });
  }

  async delete(id: number): Promise<[number, ParametroDet[]]> {
    return await ParametroDet.update({ estado: 'Eliminado' }, {
      where: { id_parametro_det: id },
      returning: true,
    });
  }

  async findByDescripcion(descripcion: string): Promise<ParametroDet[]> {
    const parametroCab = await ParametroCab.findOne({
      where: {
        descripcion: {
          [Op.like]: `%${descripcion}%`
        }
      }
    });

    if (parametroCab) {
      const parametroDets = await ParametroDet.findAll({
        where: {
          parametro_cab_id: parametroCab.id_parametro_cab
        }
      });
      return parametroDets;
    } else {
      return [];
    }
  }

}

export default new ParametroDetRepository();