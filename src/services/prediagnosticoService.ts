import OpenAI from 'openai';
import MedicoService from './medicoService';
import parametroDetService from './parametroDetService';
import InstitucionMedicaService from './institucionMedicaService';
import enviroment from '../config/enviroment';
import fs from 'fs';
import pdf from 'pdf-parse';

class PrediagnosticoService {
  private openai: OpenAI;

  constructor() {
    const apiKey = enviroment.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('The OPENAI_API_KEY environment variable is missing or empty');
    }
    this.openai = new OpenAI({ apiKey });
  }

  async generarPrediagnostico(nombre: string, sintomas: string[], filePath?: string, coordenada_x?: string, coordenada_y?: string): Promise<any> {
  const messages = await this.createMessages(nombre, sintomas, filePath);
  const prediagnostico = await this.getPrediagnostico(messages);
  const especialidad = await this.obtenerEspecialidad(prediagnostico);
  const medicosRecomendados = await this.getMedicosRecomendados(especialidad, coordenada_x, coordenada_y);

  return {
    prediagnostico,
    recomendaciones: `Se recomienda consultar con un especialista en ${especialidad}.`,
    medicosCercanosRecomendados: medicosRecomendados
  };
}

private async createMessages(nombre: string, sintomas: string[], filePath?: string): Promise<{ role: 'system' | 'user'; content: string }[]> {
  const messages: { role: 'system' | 'user'; content: string }[] = [
    { role: 'system', content: 'Eres un asistente médico que ayuda a diagnosticar enfermedades basadas en síntomas.' },
    { role: 'user', content: `Paciente ${nombre} presenta los siguientes síntomas: ${sintomas.join(', ')}` }
  ];

  if (filePath) {
    const pdfContent = await this.extractTextFromPDF(filePath);
    messages.push({ role: 'user', content: `El pdf adjunto contiene los resultados de laboratorio: ${pdfContent}` });
  }

  return messages;
}

  private async getPrediagnostico(messages: { role: 'system' | 'user'; content: string }[]): Promise<string> {
    const respuestaIA = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages,
      max_tokens: 4096
    });

    return respuestaIA.choices?.[0]?.message.content?.trim() || '';
  }

  private async obtenerEspecialidad(prediagnostico: string): Promise<string> {
    const especialidadesArray = await parametroDetService.getParametroDetsByDescripcion('ESPECIALIDADES');
    for (const especialidad of especialidadesArray) {
      if (prediagnostico.toLowerCase().includes(especialidad.valor.toLowerCase())) {
        return especialidad.valor;
      }
    }
    return 'MEDICINA GENERAL';
  }

  private async getMedicosRecomendados(especialidad: string, coordenada_x?: string, coordenada_y?: string): Promise<any[]> {
  if (!coordenada_x || !coordenada_y) return [];

  const x = parseFloat(coordenada_x);
  const y = parseFloat(coordenada_y);
  if (isNaN(x) || isNaN(y)) return [];

  const institucionesCercanas = await this.getInstitucionesCercanas(x, y);
  let medicosRecomendados: any[] = [];
  let counter = 0;

  for (const institucion of institucionesCercanas) {
    const medicosCercanos = await MedicoService.getMedicosByParams({ institucion_medica_id: institucion.dataValues.id_institucion_medica, especialidad });
    if (counter < 3 && medicosCercanos.length > 0) {
      medicosCercanos.forEach(medico => {
        medicosRecomendados.push({
          medico: {
            id_medico: medico.dataValues.id_medico,
            nombre: medico.dataValues.nombre,
            especialidad: medico.dataValues.especialidad,
            email: medico.dataValues.email,
            telefono: medico.dataValues.teléfono,
            estado: medico.dataValues.estado,
            institucion: {
              id_institucion_medica: institucion.dataValues.id_institucion_medica,
              nombre: institucion.dataValues.nombre,
              direccion: institucion.dataValues.direccion,
              telefono: institucion.dataValues.telefono,
              estado: institucion.dataValues.estado,
              coordenada_x: institucion.dataValues.coordenada_x,
              coordenada_y: institucion.dataValues.coordenada_y
            }
          }
        });
      });
      counter++;
    }
  }

  return medicosRecomendados;
}

  private async extractTextFromPDF(filePath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    return pdfData.text;
  }

  async getInstitucionesCercanas(x: number, y: number): Promise<any> {
    return await InstitucionMedicaService.getInstitucionesCercanas(x, y);
  }
}

export default new PrediagnosticoService();