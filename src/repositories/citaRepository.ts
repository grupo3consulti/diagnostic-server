import Cita from '../entities/Cita';
import { CitaCreationAttributes } from '../entities/Cita';

class CitaRepository {
  async create(cita: CitaCreationAttributes): Promise<Cita> {
    return await Cita.create(cita);
  }

  async findAll(): Promise<Cita[]> {
    return await Cita.findAll();
  }

  async findById(id: number): Promise<Cita | null> {
    return await Cita.findByPk(id);
  }

  async findByParams(params: Partial<CitaCreationAttributes>): Promise<Cita[]> {
    return await Cita.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<CitaCreationAttributes>): Promise<Cita | null> {
    return await Cita.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(id: number, updates: Partial<CitaCreationAttributes>): Promise<[number, Cita[]]> {
    return await Cita.update(updates, {
      where: { id_cita: id },
      returning: true
    });
  }

  async delete(id: number): Promise<[number, Cita[]]> {
    return await Cita.update({ estado: 'Eliminado' }, {
      where: { id_cita: id },
      returning: true
    });
  }
}

export default new CitaRepository();