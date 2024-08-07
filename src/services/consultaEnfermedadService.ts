import ConsultaEnfermedadRepository from '../repositories/consultaEnfermedadRepository';
import ConsultaEnfermedad, { ConsultaEnfermedadCreationAttributes } from '../entities/ConsultaEnfermedad';

class ConsultaEnfermedadService {
  async create(consultaEnfermedad: ConsultaEnfermedadCreationAttributes): Promise<ConsultaEnfermedad> {
    return await ConsultaEnfermedadRepository.create(consultaEnfermedad);
  }

  async findAll(): Promise<ConsultaEnfermedad[]> {
    return await ConsultaEnfermedadRepository.findAll();
  }

  async findById(consulta_id: number, enfermedad_id: number): Promise<ConsultaEnfermedad | null> {
    return await ConsultaEnfermedadRepository.findById(consulta_id, enfermedad_id);
  }

  async findByParams(params: Partial<ConsultaEnfermedadCreationAttributes>): Promise<ConsultaEnfermedad[]> {
    return await ConsultaEnfermedadRepository.findByParams(params);
  }

  async findOneByParams(params: Partial<ConsultaEnfermedadCreationAttributes>): Promise<ConsultaEnfermedad | null> {
    return await ConsultaEnfermedadRepository.findOneByParams(params);
  }

  async update(consulta_id: number, enfermedad_id: number, updates: Partial<ConsultaEnfermedadCreationAttributes>): Promise<[number, ConsultaEnfermedad[]]> {
    return await ConsultaEnfermedadRepository.update(consulta_id, enfermedad_id, updates);
  }

  async delete(consulta_id: number, enfermedad_id: number): Promise<[number, ConsultaEnfermedad[]]> {
    return await ConsultaEnfermedadRepository.delete(consulta_id, enfermedad_id);
  }
}

export default new ConsultaEnfermedadService();