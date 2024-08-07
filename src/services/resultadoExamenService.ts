import ResultadoExamenRepository from '../repositories/resultadoExamenRepository';
import ResultadoExamen, { ResultadoExamenCreationAttributes } from '../entities/ResultadoExamen';

class ResultadoExamenService {
  async create(resultadoExamen: ResultadoExamenCreationAttributes): Promise<ResultadoExamen> {
    return await ResultadoExamenRepository.create(resultadoExamen);
  }

  async findAll(): Promise<ResultadoExamen[]> {
    return await ResultadoExamenRepository.findAll();
  }

  async findById(id: number): Promise<ResultadoExamen | null> {
    return await ResultadoExamenRepository.findById(id);
  }

  async findByParams(params: Partial<ResultadoExamenCreationAttributes>): Promise<ResultadoExamen[]> {
    return await ResultadoExamenRepository.findByParams(params);
  }

  async findOneByParams(params: Partial<ResultadoExamenCreationAttributes>): Promise<ResultadoExamen | null> {
    return await ResultadoExamenRepository.findOneByParams(params);
  }

  async update(id: number, updates: Partial<ResultadoExamenCreationAttributes>): Promise<[number, ResultadoExamen[]]> {
    return await ResultadoExamenRepository.update(id, updates);
  }

  async delete(id: number): Promise<[number, ResultadoExamen[]]> {
    return await ResultadoExamenRepository.delete(id);
  }
}

export default new ResultadoExamenService();