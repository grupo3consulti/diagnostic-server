import ConsultaSintoma from '../entities/ConsultaSintoma';
import { ConsultaSintomaCreationAttributes } from '../entities/ConsultaSintoma';

class ConsultaSintomaRepository {
  async create(consultaSintoma: ConsultaSintomaCreationAttributes): Promise<ConsultaSintoma> {
    return await ConsultaSintoma.create(consultaSintoma);
  }

  async bulkCreate(consultaSintomas: ConsultaSintomaCreationAttributes[]): Promise<ConsultaSintoma[]> {
    return await ConsultaSintoma.bulkCreate(consultaSintomas);
  }

  async findAll(): Promise<ConsultaSintoma[]> {
    return await ConsultaSintoma.findAll();
  }

  async findById(consulta_id: number, sintoma_id: number): Promise<ConsultaSintoma | null> {
    return await ConsultaSintoma.findOne({
      where: { consulta_id, sintoma_id }
    });
  }

  async findByParams(params: Partial<ConsultaSintomaCreationAttributes>): Promise<ConsultaSintoma[]> {
    return await ConsultaSintoma.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<ConsultaSintomaCreationAttributes>): Promise<ConsultaSintoma | null> {
    return await ConsultaSintoma.findOne({
      where: {
        ...params
      }
    });
  }

  async update(consulta_id: number, sintoma_id: number, updates: Partial<ConsultaSintomaCreationAttributes>): Promise<[number, ConsultaSintoma[]]> {
    return await ConsultaSintoma.update(updates, {
      where: { consulta_id, sintoma_id },
      returning: true
    });
  }

  async delete(consulta_id: number, sintoma_id: number): Promise<[number, ConsultaSintoma[]]> {
    return await ConsultaSintoma.update({ estado: 'Eliminado' }, {
      where: { consulta_id, sintoma_id },
      returning: true
    });
  }
}

export default new ConsultaSintomaRepository();