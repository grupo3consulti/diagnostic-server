import OpenAI from 'openai';
import enviroment from '../config/enviroment';

class IAService {
  private openai: OpenAI;

  constructor() {
    const apiKey = enviroment.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('The OPENAI_API_KEY environment variable is missing or empty');
    }
    this.openai = new OpenAI({ apiKey });
  }

  async getIAResponse(messages: { role: 'system' | 'user'; content: string }[]): Promise<string> {
    const respuestaIA = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages,
      max_tokens: 4096
    });

    return respuestaIA.choices?.[0]?.message.content?.trim() || '';
    
  }

    async getStrucutredOutput(messages: { role: 'system' | 'user'; content: string }[], response_format: any): Promise<any> {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages,
                response_format,
                max_tokens: 500
            })
            
            if (!response.choices[0].message) {
                throw new Error("No se pudo obtener una respuesta");
            }
            
            const respuesta = response.choices[0].message;

            if (respuesta.content) {
                return respuesta.content;
            } else {
            throw new Error("Se genero una respuesta vacia");
            }
            
        } catch (error) {
            console.log('Error al obtener la respuesta de OpenAi: ' + error)
        }
    }
}

export default new IAService();