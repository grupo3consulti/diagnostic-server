import SintomaRepository from '../repositories/sintomaRepository';
import Sintoma from '../entities/Sintoma';
import { SintomaCreationAttributes } from '../entities/Sintoma';
import parametroDetService from './parametroDetService';
import parametroCabService from './parametroCabService';
import enfermedadSintomaService from './enfermedadSintomaService';

class SintomaService {
  async createSintoma(sintomaData: SintomaCreationAttributes): Promise<Sintoma> {
    return await SintomaRepository.create(sintomaData);
  }

  async getAllSintomas(): Promise<Sintoma[]> {
    return await SintomaRepository.findAll();
  }

  async getSintomaById(id: number): Promise<Sintoma | null> {
    return await SintomaRepository.findById(id);
  }

  async getSintomasByParams(params: Partial<SintomaCreationAttributes>): Promise<Sintoma[]> {
    return await SintomaRepository.findByParams(params);
  }

  async getOneSintomaByParams(params: Partial<SintomaCreationAttributes>): Promise<Sintoma | null> {
    return await SintomaRepository.findOneByParams(params);
  }

  async updateSintoma(id: number, updates: Partial<SintomaCreationAttributes>): Promise<[number, Sintoma[]]> {
    return await SintomaRepository.update(id, updates);
  }

  async deleteSintoma(id: number): Promise<[number, Sintoma[]]> {
    return await SintomaRepository.delete(id);
  }

  async getSintomasGeneradosIa() :Promise<Sintoma[]>{
      var sintomasEncontrado: Sintoma[] = []; 
      try {
          var parametroCab = await parametroCabService.findOneByParams({descripcion: 'ENFERMEDADES_GENERADAS_POR_IA', estado:'activo'})
          
          if(!parametroCab)
          {
              throw new Error('No se pudo obtener el parametro cabecera')
          }
  
          var parametrosDet = await parametroDetService.getParametroDetsByCabId(parametroCab.id_parametro_cab)
  
          for (const parametroDet of parametrosDet) {
              var enfermedadSintoma = await enfermedadSintomaService.findOneByParams({id_enfermedad_sintoma: Number(parametroDet.valor), estado: 'activo'})
              var sintoma = await this.getSintomaById(Number(enfermedadSintoma?.sintoma_id))

            if (sintoma && !sintomasEncontrado.some(sintomaEncontrado => sintomaEncontrado.id_sintoma === sintoma?.id_sintoma)) {
                sintomasEncontrado.push(sintoma);
            }
          }
  
      } catch (error:any) {
          console.error(error.message)
      }
      return sintomasEncontrado
  }

  async getAllSintomasGeneradosIaFirst(): Promise<Sintoma[]> {
    try {
        const sintomasGeneradosIa = await this.getSintomasGeneradosIa();
        const allSintomas = await this.getAllSintomas();

        const sintomasNoGeneradosIa = allSintomas.filter(sintoma => !sintomasGeneradosIa.some(sintomaGeneradoIa => sintomaGeneradoIa.id_sintoma === sintoma.id_sintoma));
        
        return [...sintomasGeneradosIa, ...sintomasNoGeneradosIa];
    } catch (error:any) {
        console.error(error.message);
        throw error;
    }
}
}

export default new SintomaService();