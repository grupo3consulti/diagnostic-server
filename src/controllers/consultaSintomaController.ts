import { Request, Response } from 'express';
import ConsultaSintomaService from '../services/consultaSintomaService';

class ConsultaSintomaController {
  async createConsultaSintoma(req: Request, res: Response): Promise<Response> {
    try {
      const consultaSintoma = await ConsultaSintomaService.createConsultaSintoma(req.body);
      return res.status(201).json(consultaSintoma);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllConsultaSintomas(req: Request, res: Response): Promise<Response> {
    try {
      const consultaSintomas = await ConsultaSintomaService.getAllConsultaSintomas();
      return res.status(200).json(consultaSintomas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getConsultaSintomaById(req: Request, res: Response): Promise<Response> {
    try {
      const consultaSintoma = await ConsultaSintomaService.getConsultaSintomaById(Number(req.params.sintoma_id),Number(req.params.consulta_id));
      if (consultaSintoma) {
        return res.status(200).json(consultaSintoma);
      } else {
        return res.status(404).json({ error: 'ConsultaSintoma not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getConsultaSintomasByParams(req: Request, res: Response): Promise<Response> {
    try {
      const consultaSintomas = await ConsultaSintomaService.getConsultaSintomasByParams(req.query);
      return res.status(200).json(consultaSintomas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateConsultaSintoma(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await ConsultaSintomaService.updateConsultaSintoma(Number(req.params.sintoma_id),Number(req.params.consulta_id), req.body);
      if (updated) {
        const updatedConsultaSintoma = await ConsultaSintomaService.getConsultaSintomaById(Number(req.params.sintoma_id),Number(req.params.consulta_id));
        return res.status(200).json(updatedConsultaSintoma);
      } else {
        return res.status(404).json({ error: 'ConsultaSintoma not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteConsultaSintoma(req: Request, res: Response): Promise<Response> {
    try {
      const [deleted] = await ConsultaSintomaService.deleteConsultaSintoma(Number(req.params.sintoma_id),Number(req.params.consulta_id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ error: 'ConsultaSintoma not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ConsultaSintomaController();