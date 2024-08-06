import CitaRepository from '../repositories/citaRepository';
import Cita from '../entities/Cita';
import { CitaCreationAttributes } from '../entities/Cita';

class CitaService {
  async createCita(citaData: CitaCreationAttributes): Promise<Cita> {
    return await CitaRepository.create(citaData);
  }

  async getAllCitas(): Promise<Cita[]> {
    return await CitaRepository.findAll();
  }

  async getCitaById(id: number): Promise<Cita | null> {
    return await CitaRepository.findById(id);
  }

  async getCitasByParams(params: Partial<CitaCreationAttributes>): Promise<Cita[]> {
    return await CitaRepository.findByParams(params);
  }

  async getOneCitaByParams(params: Partial<CitaCreationAttributes>): Promise<Cita | null> {
    return await CitaRepository.findOneByParams(params);
  }

  async updateCita(id: number, updates: Partial<CitaCreationAttributes>): Promise<[number, Cita[]]> {
    return await CitaRepository.update(id, updates);
  }

  async deleteCita(id: number): Promise<[number, Cita[]]> {
    return await CitaRepository.delete(id);
  }
}

export default new CitaService();