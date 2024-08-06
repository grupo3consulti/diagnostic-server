import InstitucionMedica from '../entities/InstitucionMedica';
import { InstitucionMedicaCreationAttributes } from '../entities/InstitucionMedica';

class InstitucionMedicaRepository {
  async create(institucionMedica: InstitucionMedicaCreationAttributes): Promise<InstitucionMedica> {
    return await InstitucionMedica.create(institucionMedica);
  }

  async findAll(): Promise<InstitucionMedica[]> {
    return await InstitucionMedica.findAll();
  }

  async findById(id: number): Promise<InstitucionMedica | null> {
    return await InstitucionMedica.findByPk(id);
  }

  async findByParams(params: Partial<InstitucionMedicaCreationAttributes>): Promise<InstitucionMedica[]> {
    return await InstitucionMedica.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<InstitucionMedicaCreationAttributes>): Promise<InstitucionMedica | null> {
    return await InstitucionMedica.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(id: number, updates: Partial<InstitucionMedicaCreationAttributes>): Promise<[number, InstitucionMedica[]]> {
    return await InstitucionMedica.update(updates, {
      where: { id_institucion_medica: id },
      returning: true
    });
  }

  async delete(id: number): Promise<[number, InstitucionMedica[]]> {
    return await InstitucionMedica.update({ estado: 'Eliminado' }, {
      where: { id_institucion_medica: id },
      returning: true
    });
  }
}

export default new InstitucionMedicaRepository();