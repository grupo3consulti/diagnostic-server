import ResultadoExamen, { ResultadoExamenCreationAttributes } from '../entities/ResultadoExamen';

class ResultadoExamenRepository {
  async create(resultadoExamen: ResultadoExamenCreationAttributes): Promise<ResultadoExamen> {
    return await ResultadoExamen.create(resultadoExamen);
  }

  async findAll(): Promise<ResultadoExamen[]> {
    return await ResultadoExamen.findAll();
  }

  async findById(id: number): Promise<ResultadoExamen | null> {
    return await ResultadoExamen.findByPk(id);
  }

  async findByParams(params: Partial<ResultadoExamenCreationAttributes>): Promise<ResultadoExamen[]> {
    return await ResultadoExamen.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<ResultadoExamenCreationAttributes>): Promise<ResultadoExamen | null> {
    return await ResultadoExamen.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(id: number, updates: Partial<ResultadoExamenCreationAttributes>): Promise<[number, ResultadoExamen[]]> {
    return await ResultadoExamen.update(updates, {
      where: { id_resultado_examen: id },
      returning: true
    });
  }

  async delete(id: number): Promise<[number, ResultadoExamen[]]> {
    return await ResultadoExamen.update({ estado: 'Eliminado' }, {
      where: { id_resultado_examen: id },
      returning: true
    });
  }
}

export default new ResultadoExamenRepository();