import ParametroDetRepository from '../repositories/parametroDetRepository';
import ParametroDet from '../entities/ParametroDet';

class ParametroDetService {
  async createParametroDet(parametroDetData: Partial<ParametroDet>): Promise<ParametroDet> {
    return await ParametroDetRepository.create(parametroDetData);
  }

  async getAllParametroDets(): Promise<ParametroDet[]> {
    return await ParametroDetRepository.findAll();
  }

  async getParametroDetById(id: number): Promise<ParametroDet | null> {
    return await ParametroDetRepository.findById(id);
  }

  async getParametroDetsByCabId(parametro_cab_id: number): Promise<ParametroDet[]> {
    return await ParametroDetRepository.findByCabId(parametro_cab_id);
  }

  async updateParametroDet(id: number, updates: Partial<ParametroDet>): Promise<[number, ParametroDet[]]> {
    return await ParametroDetRepository.update(id, updates);
  }

  async deleteParametroDet(id: number): Promise<[number, ParametroDet[]]> {
    return await ParametroDetRepository.delete(id);
  }

  async getParametroDetsByDescripcion(descripcion: string): Promise<ParametroDet[]> {
    return await ParametroDetRepository.findByDescripcion(descripcion);
  }
  
}

export default new ParametroDetService();