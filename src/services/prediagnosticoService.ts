import IAService from './iAService';
import MessageService from './messageService';
import MedicoService from './medicoService';
import parametroDetService from './parametroDetService';
import InstitucionMedicaService from './institucionMedicaService';
import PdfParse from 'pdf-parse';

class PrediagnosticoService {

  private async extractTextFromPDF(file: any): Promise<string> {
    const pdfData = await PdfParse(file.buffer);
    
    return pdfData.text;
  }

  /**
   * 
   * Método que genera un prediagnóstico basado en los síntomas proporcionados mediante IA.
   * 
   * @param nombre 
   * @param sintomas 
   * @param archivo 
   * @param coordenada_x 
   * @param coordenada_y 
   * @returns object
   */

  async generarPrediagnostico(nombre: string, sintomas: string[], archivo?: any, coordenada_x?: string, coordenada_y?: string): Promise<any> {
    
    const initialMessages: { role: 'system' | 'user'; content: string }[] = [
      { role: 'system', content: 'Eres un asistente médico que ayuda a diagnosticar enfermedades basadas en síntomas.' },
      { role: 'user', content: `Paciente ${nombre} presenta los siguientes síntomas: ${sintomas.join(', ')}` }
    ];

    if (archivo) {
      const pdfContent = await this.extractTextFromPDF(archivo);
      initialMessages.push({ role: 'user', content: `El pdf adjunto contiene los resultados de laboratorio: ${pdfContent}` });
    }

    const messages = await MessageService.createMessages(initialMessages);
    const prediagnostico = await IAService.getIAResponse(messages);
    const especialidad = await this.obtenerEspecialidad(prediagnostico);
    const medicosRecomendados = await this.getMedicosRecomendados(especialidad, coordenada_x, coordenada_y);

    return {
      prediagnostico,
      recomendaciones: `Se recomienda consultar con un especialista en ${especialidad}.`,
      medicosCercanosRecomendados: medicosRecomendados
    };
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
              telefono: medico.dataValues.telefono,
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

  async getInstitucionesCercanas(x: number, y: number): Promise<any> {
    return await InstitucionMedicaService.getInstitucionesCercanas(x, y);
  }
}

export default new PrediagnosticoService();