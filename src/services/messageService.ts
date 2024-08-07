
class MessageService {
  async createMessages(messages: { role: 'system' | 'user'; content: string }[]): Promise<{ role: 'system' | 'user'; content: string }[]> {
    return messages;
  }
}

export default new MessageService();