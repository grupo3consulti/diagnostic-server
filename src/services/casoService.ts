import CasoRepository from '../repositories/casoRepository';
import Caso, { CasoCreationAttributes } from '../entities/Caso';
import provinciaService from './provinciaService';
import ciudadService from './ciudadService';
import enfermedadService from './enfermedadService';

class CasoService {
  async create(caso: CasoCreationAttributes): Promise<Caso> {
    return await CasoRepository.create(caso);
  }

  async findAll(): Promise<Caso[]> {
    return await CasoRepository.findAll();
  }

  async findById(id_caso: number): Promise<Caso | null> {
    return await CasoRepository.findById(id_caso);
  }

  async findByParams(params: Partial<CasoCreationAttributes>): Promise<Caso[]> {
    return await CasoRepository.findByParams(params);
  }

  async findOneByParams(params: Partial<CasoCreationAttributes>): Promise<Caso | null> {
    return await CasoRepository.findOneByParams(params);
  }

  async update(id_caso: number, updates: Partial<CasoCreationAttributes>): Promise<[number, Caso[]]> {
    return await CasoRepository.update(id_caso, updates);
  }

  async delete(id_caso: number): Promise<[number, Caso[]]> {
    return await CasoRepository.delete(id_caso);
  }

async getCasosByProvincia(nombreProvincia: string): Promise<Caso[]> {
    try {
        const provincia = await provinciaService.findOneByParams({ nombre_provincia: nombreProvincia });
        const ciudades = await ciudadService.findByParams({ id_provincia: provincia?.id_provincia });

        const casos: Caso[] = [];

        for (const ciudad of ciudades) {
            const casosCiudad = await this.findByParams({ id_ciudad: ciudad.id_ciudad, estado: 'activo' });
            casos.push(...casosCiudad);
        }

        // Sumar los casos de cada ciudad
        const casosPorCiudad: { [key: number]: Caso } = {};

        for (const caso of casos) {
            if (!casosPorCiudad[caso.id_ciudad]) {
                casosPorCiudad[caso.id_ciudad] = caso;
            } else {
                casosPorCiudad[caso.id_ciudad].cantidad_casos = (casosPorCiudad[caso.id_ciudad].cantidad_casos || 0) + (caso.cantidad_casos || 0);
            }
        }

        return Object.values(casosPorCiudad);
    } catch (error) {
        // Handle error
        return [];
    }
}
async getCasosByCiudad(nombre: string): Promise<Caso[]> {
    try {
        const ciudad = await ciudadService.findOneByParams({ nombre_ciudad: nombre });
        return await this.findByParams({ id_ciudad: ciudad?.id_ciudad, estado: 'activo' });
    } catch (error) {
        // Handle error
        return [];
    }
}
async getCasosByEnfermedad(nombre: string): Promise<Caso[]> {
    try {
        const enfermedad = await enfermedadService.findOneByParams({nombre: nombre});
        const casos = await this.findByParams({ id_enfermedad: enfermedad?.id_enfermedad, estado: 'activo' });
        return casos;
    } catch (error) {
        // Handle error
        return [];
    }
}
async generateSemaforo(tipo: string, valor: string): Promise<{ enfermedad: string, color: string, cantidad: number }[]> {
    try {
        console.log('Generando semáforo para tipo: ' + tipo);
        let casos: Caso[] = [];
        if (tipo === 'ciudad') {
            casos = await this.getCasosByCiudad(valor);
        } else if (tipo === 'provincia') {
            casos = await this.getCasosByProvincia(valor);
        } else if (tipo === 'enfermedad') {
            casos = await this.getCasosByEnfermedad(valor);
        } else {
            casos = await this.findByParams({ estado: 'activo' });
        }
        
        const semaforo: { [key: string]: number } = {};

        for (const caso of casos) {
            const enfermedad = await enfermedadService.findOneByParams({ id_enfermedad: caso.id_enfermedad });
            const nombreEnfermedad = enfermedad?.nombre;

            if (nombreEnfermedad) {
                if (!semaforo[nombreEnfermedad]) {
                    semaforo[nombreEnfermedad] = 0;
                }

                semaforo[nombreEnfermedad] += caso.cantidad_casos || 0;
            }
        }

        const semaforoEnfermedades: { enfermedad: string, color: string, cantidad: number }[] = [];

        for (const enfermedad in semaforo) {
            const cantidadCasos = semaforo[enfermedad];
            let color = '';
            
            if (cantidadCasos < 10) {
                color = 'verde';
            } else if (cantidadCasos < 20) {
                color = 'amarillo';
            } else {
                color = 'rojo';
            }

            semaforoEnfermedades.push({ enfermedad, color, cantidad: cantidadCasos });
        }

        console.log('Semaforo generado:', semaforoEnfermedades);
        return semaforoEnfermedades;
    } catch (error) {
        console.log('Ocurrió un error al generar el semáforo, detalles: ' + error);
        return [];
    }
}

}

export default new CasoService();
