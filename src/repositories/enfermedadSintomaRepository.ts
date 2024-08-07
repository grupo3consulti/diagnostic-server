import EnfermedadSintoma, { EnfermedadSintomaCreationAttributes } from '../entities/EnfermedadSintoma';

class EnfermedadSintomaRepository {
  async create(enfermedadSintoma: EnfermedadSintomaCreationAttributes): Promise<EnfermedadSintoma> {
    return await EnfermedadSintoma.create(enfermedadSintoma);
  }

  async findAll(): Promise<EnfermedadSintoma[]> {
    return await EnfermedadSintoma.findAll();
  }

  async findById(enfermedad_id: number, sintoma_id: number): Promise<EnfermedadSintoma | null> {
    return await EnfermedadSintoma.findOne({
      where: { enfermedad_id, sintoma_id }
    });
  }

  async findByParams(params: Partial<EnfermedadSintomaCreationAttributes>): Promise<EnfermedadSintoma[]> {
    return await EnfermedadSintoma.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<EnfermedadSintomaCreationAttributes>): Promise<EnfermedadSintoma | null> {
    return await EnfermedadSintoma.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(enfermedad_id: number, sintoma_id: number, updates: Partial<EnfermedadSintomaCreationAttributes>): Promise<[number, EnfermedadSintoma[]]> {
    return await EnfermedadSintoma.update(updates, {
      where: { enfermedad_id, sintoma_id },
      returning: true
    });
  }

  async delete(enfermedad_id: number, sintoma_id: number): Promise<[number, EnfermedadSintoma[]]> {
    return await EnfermedadSintoma.update({ estado: 'Eliminado' }, {
      where: { enfermedad_id, sintoma_id },
      returning: true
    });
  }
}

export default new EnfermedadSintomaRepository();