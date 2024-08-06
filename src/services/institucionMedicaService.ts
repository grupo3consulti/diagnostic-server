import InstitucionMedicaRepository from '../repositories/institucionMedicaRepository';
import InstitucionMedica from '../entities/InstitucionMedica';
import { InstitucionMedicaCreationAttributes } from '../entities/InstitucionMedica';

interface InstitucionMedicaWithDistance extends InstitucionMedica {
  distance: number;
}

class InstitucionMedicaService {
  async createInstitucionMedica(institucionMedicaData: InstitucionMedicaCreationAttributes): Promise<InstitucionMedica> {
    return await InstitucionMedicaRepository.create(institucionMedicaData);
  }

  async getAllInstitucionesMedicas(): Promise<InstitucionMedica[]> {
    return await InstitucionMedicaRepository.findAll();
  }

  async getInstitucionMedicaById(id: number): Promise<InstitucionMedica | null> {
    return await InstitucionMedicaRepository.findById(id);
  }

  async getInstitucionesMedicasByParams(params: Partial<InstitucionMedicaCreationAttributes>): Promise<InstitucionMedica[]> {
    return await InstitucionMedicaRepository.findByParams(params);
  }

  async getOneInstitucionMedicaByParams(params: Partial<InstitucionMedicaCreationAttributes>): Promise<InstitucionMedica | null> {
    return await InstitucionMedicaRepository.findOneByParams(params);
  }

  async updateInstitucionMedica(id: number, updates: Partial<InstitucionMedicaCreationAttributes>): Promise<[number, InstitucionMedica[]]> {
    return await InstitucionMedicaRepository.update(id, updates);
  }

  async deleteInstitucionMedica(id: number): Promise<[number, InstitucionMedica[]]> {
    return await InstitucionMedicaRepository.delete(id);
  }

  private calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  async getInstitucionesCercanas(x: number, y: number): Promise<InstitucionMedicaWithDistance[]> {
    const allInstitutions = await this.getAllInstitucionesMedicas();
    const sortedInstitutions = allInstitutions
        .map(institution => {
          const coordenada_x = parseFloat(institution.coordenada_x ?? '0');
          const coordenada_y = parseFloat(institution.coordenada_y ?? '0');
          if (!isNaN(coordenada_x) && !isNaN(coordenada_y)) {
            return {
              ...institution,
              distance: this.calculateDistance(x, y, coordenada_x, coordenada_y)
            } as InstitucionMedicaWithDistance;
          }
          return institution as InstitucionMedicaWithDistance;
        })
        .sort((a, b) => a.distance - b.distance);

    return sortedInstitutions;
  }



}

export default new InstitucionMedicaService();