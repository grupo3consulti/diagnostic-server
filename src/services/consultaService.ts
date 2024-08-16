import ConsultaRepository from '../repositories/consultaRepository';
import Consulta from '../entities/Consulta';
import { ConsultaCreationAttributes } from '../entities/Consulta';
import consultaSintomaRepository from '../repositories/consultaSintomaRepository';
import resultadoExamenRepository from '../repositories/resultadoExamenRepository';
import consultaEnfermedadRepository from '../repositories/consultaEnfermedadRepository';
import MessageService from './messageService';
import IAService from './iAService';
import enfermedadRepository from '../repositories/enfermedadRepository';
import consultaAuditoriaRepository from '../repositories/consultaAuditoriaRepository';
import UtilService from './utilService';

interface IAResponse<T> {
  data: T;
}

interface iaResultadoExamenPDF {
    tipo_examen: string;
    resultado: {
      [key: string]: {
        [key: string]: string;
      };
    };
}

interface iaResponseEnfermedad {
  Enfermedad: string;
  Descripcion: string;
  Tipo: string;
}

interface iaResponseDiagnostico {
  [key: string]: string;
}

async function extractJsonFromString(input: string): Promise<any> {
  const jsonStart = input.indexOf('{');
  const jsonEnd = input.lastIndexOf('}') + 1;

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('No JSON found in the input string');
  }

  const jsonString = input.substring(jsonStart, jsonEnd);

  try {
    return JSON.parse(jsonString);
  } catch (error: any) {
    throw new Error(`Error parsing JSON: ${error.message}`);
  }
}


class ConsultaService {

  async convertIAResponseToJson<T>(iaResponse: string): Promise<T> {
    try {
      const parsedResponse: T = JSON.parse(iaResponse);
      return parsedResponse;
    } catch (error:any) {
      throw new Error(`Error parsing IA response: ${error.message}`);
    }
  }

  /**
   * 
   * Método que consume IA para crear una consulta, basa en un resultado de examen en PDF
   * 
   * @param data
   * @returns Consulta
   * @description Create a Consulta based on a PDF exam result
   * @throws Error
   * 
   * 
   **/

  async createConsulta(data: any): Promise<Consulta> {
    try {
      const consultaData: ConsultaCreationAttributes = {
        fecha_hora: data.fecha_hora,
        descripcion: data.descripcion,
        documento: data.documento,
        usuario_id: data.usuario_id,
        medico_id: data.medico_id,
        estado: 'activo',
        usr_creacion: 'system',
        usr_modificacion: 'system',
        fecha_creacion: new Date(),
        fecha_modificacion: new Date(),
        cita_id: data.cita_id
      };

      const consulta = await ConsultaRepository.create(consultaData);

      const sintomasArray = data.sintomas.map((sintoma: { id_sintoma: number }) => ({
        consulta_id: consulta.id_consulta,
        sintoma_id: sintoma.id_sintoma,
        estado: 'activo',
        usr_creacion: 'system',
      }));

      await consultaSintomaRepository.bulkCreate(sintomasArray);

      const initialMessages: { role: 'system' | 'user'; content: string }[] = [
        { role: 'system', content: 'Eres un asistente médico que ayuda a diagnosticar enfermedades basadas en síntomas.' },
        { role: 'user', content: `Paciente presenta los siguientes síntomas: ${data.sintomas.map((s: { descripcion: string }) => s.descripcion).join(', ')}` }
      ];

      if (data.file) {
        const pdfContent = await UtilService.extractTextFromPDF(data.file);
        initialMessages.push({
          role: 'user',
          content: `El PDF adjunto contiene los resultados de laboratorio: ${pdfContent}. Necesito que me proporciones un JSON con esta estructura: {"Enfermedad": "nombre de la enfermedad", "Descripcion": "descripción de la enfermedad", "Tipo": "tipo de la enfermedad"}. Solo el JSON, sin texto adicional, y respetando exactamente los campos de salida.`
        });
        initialMessages.push({role: 'user',
          content: `Genera obligatoriamente solo el json.`});
      }else{
        throw new Error('No se ha adjuntado un documento');
      }

      const messagesEnfermedad = await MessageService.createMessages(initialMessages);
      const iaResult = await IAService.getIAResponse(messagesEnfermedad);
      const iaResEnfermedad: iaResponseEnfermedad = await this.convertIAResponseToJson<iaResponseEnfermedad>(iaResult);

      if (iaResEnfermedad) {
        const enfermedadObj = await enfermedadRepository.findOneByParams({ nombre: iaResEnfermedad.Enfermedad });
        if (enfermedadObj) {
          const consultaEnfermedad = {
            consulta_id: consulta.id_consulta,
            enfermedad_id: enfermedadObj.id_enfermedad,
            estado: 'activo',
            usr_creacion: 'system',
          };
          await consultaEnfermedadRepository.create(consultaEnfermedad);
        } else {
          const enfermedad = {
            nombre: iaResEnfermedad.Enfermedad,
            descripcion: iaResEnfermedad.Descripcion,
            tipo: iaResEnfermedad.Tipo,
            estado: 'activo',
            usr_creacion: 'system',
          };
          const enfermedadCreateObj = await enfermedadRepository.create(enfermedad);
          const consultaEnfermedad = {
            consulta_id: consulta.id_consulta,
            enfermedad_id: enfermedadCreateObj.id_enfermedad,
            estado: 'activo',
            usr_creacion: 'system',
          };
          await consultaEnfermedadRepository.create(consultaEnfermedad);
        }
      }

      if (data.file) {
        const examenMessage: { role: 'system' | 'user'; content: string }[] = [
          { role: 'system', content: 'Eres un asistente médico que ayuda a diagnosticar enfermedades basadas en pdf de examenes.' },
        ];
        const pdfContent = await UtilService.extractTextFromPDF(data.file);
        examenMessage.push({
          role: 'user',
          content: `Analiza el pdf y dame un json sin ningun texto adicional, siguiendo esta estructura: 
                      {
                          aaaaa:"aaaaa",
                          aaaaa: {
                              "aaaa": {
                                  "aaaaa": "aaaaaa",
                                  "aaaa": "aaaaa",
                                  "aaa": "aaaa"
                              }
                          }
                      }.${pdfContent}.`
          });
        examenMessage.push({role: 'user',
          content: `Genera obligatoriamente solo el json.`});

        const messagesExamenes = await MessageService.createMessages(examenMessage);
        const iaResultExamenes = await IAService.getIAResponse(messagesExamenes);
        const jsonObject = await extractJsonFromString(iaResultExamenes);
        if (jsonObject) {
          const resultadoExamen = {
            consulta_id: consulta.id_consulta,
            tipo_examen: 'examen',
            resultado: JSON.stringify(jsonObject),
            estado: 'activo',
            usr_creacion: 'system',
            usr_modificacion: 'system',
          };
          await resultadoExamenRepository.create(resultadoExamen);
        }

        const auditoriaMessage: { role: 'system' | 'user'; content: string }[] = [
          { role: 'system', content: 'Eres un asistente médico que ayuda a diagnosticar enfermedades basadas en pdf de examenes.' },
          { role: 'user', content: `De este pdf: ${pdfContent}, con estos síntomas: ${data.sintomas.map((s: { descripcion: string }) => s.descripcion).join(', ')}, Dame un diagnostico, y recomendaciones.` },
        ];

        const auditoriaMessages = await MessageService.createMessages(auditoriaMessage);
        const iaResultadoPrediagnostico = await IAService.getIAResponse(auditoriaMessages);


        if (iaResultadoPrediagnostico) {
          const auditoriaObj = {
            consulta_id: consulta.id_consulta,
            prediagnostico: iaResultadoPrediagnostico,
            documento_auditoria: data.documento,
            usr_creacion: 'system',
            usr_modificacion: 'system',
          };
          await consultaAuditoriaRepository.create(auditoriaObj);
        }
      }

      return consulta;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllConsultas(): Promise<Consulta[]> {
    return await ConsultaRepository.findAll();
  }

  async getConsultaById(id: number): Promise<Consulta | null> {
    return await ConsultaRepository.findById(id);
  }

  async getConsultasByParams(params: Partial<ConsultaCreationAttributes>): Promise<Consulta[]> {
    return await ConsultaRepository.findByParams(params);
  }

  async getOneConsultaByParams(params: Partial<ConsultaCreationAttributes>): Promise<Consulta | null> {
    return await ConsultaRepository.findOneByParams(params);
  }

  async updateConsulta(id: number, updates: Partial<ConsultaCreationAttributes>): Promise<[number, Consulta[]]> {
    return await ConsultaRepository.update(id, updates);
  }

  async deleteConsulta(id: number): Promise<[number, Consulta[]]> {
    return await ConsultaRepository.delete(id);
  }
  async getAllConsultaBetween(fecha_ini: Date, fecha_fin: Date): Promise<Consulta[]> {
    return await ConsultaRepository.findAllBetween(fecha_ini, fecha_fin);
  }

/**
 * Método para obtener los detalles de una consulta por cita_id
 * 
 * @param cita_id
 * @returns Consulta details
 * @description Get Consulta details by cita_id
 * @throws Error
 * 
 * 
**/

  async getConsultaDetailsByCitaId(cita_id: number): Promise<any> {
    try {
      const consulta = await ConsultaRepository.findOneByParams({ cita_id });

      if (!consulta) {
        throw new Error('Consulta no encontrada');
      }

      const consulta_id = consulta.id_consulta;

      const resultadoExamen = await resultadoExamenRepository.findByParams({ consulta_id });
      const consultaSintomas = await consultaSintomaRepository.findByParams({ consulta_id });
      const consultaEnfermedad = await consultaEnfermedadRepository.findByParams({ consulta_id });
      const consultaAuditoria = await consultaAuditoriaRepository.findByParams({ consulta_id });

      return {
        consulta,
        resultadoExamen,
        consultaSintomas,
        consultaEnfermedad,
        consultaAuditoria
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

}

export default new ConsultaService();