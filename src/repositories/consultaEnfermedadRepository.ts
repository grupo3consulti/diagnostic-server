import ConsultaEnfermedad, { ConsultaEnfermedadCreationAttributes } from '../entities/ConsultaEnfermedad';

class ConsultaEnfermedadRepository {
  async create(consultaEnfermedad: ConsultaEnfermedadCreationAttributes): Promise<ConsultaEnfermedad> {
    return await ConsultaEnfermedad.create(consultaEnfermedad);
  }

  async findAll(): Promise<ConsultaEnfermedad[]> {
    return await ConsultaEnfermedad.findAll();
  }

  async findById(consulta_id: number, enfermedad_id: number): Promise<ConsultaEnfermedad | null> {
    return await ConsultaEnfermedad.findOne({
      where: { consulta_id, enfermedad_id }
    });
  }

  async findByParams(params: Partial<ConsultaEnfermedadCreationAttributes>): Promise<ConsultaEnfermedad[]> {
    return await ConsultaEnfermedad.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<ConsultaEnfermedadCreationAttributes>): Promise<ConsultaEnfermedad | null> {
    return await ConsultaEnfermedad.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(consulta_id: number, enfermedad_id: number, updates: Partial<ConsultaEnfermedadCreationAttributes>): Promise<[number, ConsultaEnfermedad[]]> {
    return await ConsultaEnfermedad.update(updates, {
      where: { consulta_id, enfermedad_id },
      returning: true
    });
  }

  async delete(consulta_id: number, enfermedad_id: number): Promise<[number, ConsultaEnfermedad[]]> {
    return await ConsultaEnfermedad.update({ estado: 'Eliminado' }, {
      where: { consulta_id, enfermedad_id },
      returning: true
    });
  }
}

export default new ConsultaEnfermedadRepository();