import Enfermedad from '../entities/Enfermedad';
import { EnfermedadCreationAttributes } from '../entities/Enfermedad';

class EnfermedadRepository {
  async create(enfermedad: EnfermedadCreationAttributes): Promise<Enfermedad> {
    return await Enfermedad.create(enfermedad);
  }

  async findAll(): Promise<Enfermedad[]> {
    return await Enfermedad.findAll();
  }

  async findById(id: number): Promise<Enfermedad | null> {
    return await Enfermedad.findByPk(id);
  }

  async findByParams(params: Partial<EnfermedadCreationAttributes>): Promise<Enfermedad[]> {
    return await Enfermedad.findAll({
      where: {
        ...params
      }
    });
  }

  async findOneByParams(params: Partial<EnfermedadCreationAttributes>): Promise<Enfermedad | null> {
    return await Enfermedad.findOne({
      where: {
        ...params
      }
    });
  }
  
  async update(id: number, updates: Partial<EnfermedadCreationAttributes>): Promise<[number, Enfermedad[]]> {
    return await Enfermedad.update(updates, {
      where: { id_enfermedad: id },
      returning: true
    });
  }

  async delete(id: number): Promise<[number, Enfermedad[]]> {
    return await Enfermedad.update({ estado: 'Eliminado' }, {
      where: { id_enfermedad: id },
      returning: true
    });
  }
}

export default new EnfermedadRepository();