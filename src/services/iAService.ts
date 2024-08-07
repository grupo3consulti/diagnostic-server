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
}

export default new IAService();