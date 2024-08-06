import { Request, Response } from 'express';
import SintomaService from '../services/sintomaService';

class SintomaController {
  async createSintoma(req: Request, res: Response): Promise<Response> {
    try {
      const sintoma = await SintomaService.createSintoma(req.body);
      return res.status(201).json(sintoma);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllSintomas(req: Request, res: Response): Promise<Response> {
    try {
      const sintomas = await SintomaService.getAllSintomas();
      return res.status(200).json(sintomas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getSintomaById(req: Request, res: Response): Promise<Response> {
    try {
      const sintoma = await SintomaService.getSintomaById(Number(req.params.id));
      if (sintoma) {
        return res.status(200).json(sintoma);
      } else {
        return res.status(404).json({ error: 'Sintoma not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getSintomasByParams(req: Request, res: Response): Promise<Response> {
    try {
      const sintomas = await SintomaService.getSintomasByParams(req.body);
      return res.status(200).json(sintomas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateSintoma(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await SintomaService.updateSintoma(Number(req.params.id), req.body);
      if (updated) {
        const updatedSintoma = await SintomaService.getSintomaById(Number(req.params.id));
        return res.status(200).json(updatedSintoma);
      } else {
        return res.status(404).json({ error: 'Sintoma not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteSintoma(req: Request, res: Response): Promise<Response> {
    try {
      const [deleted] = await SintomaService.deleteSintoma(Number(req.params.id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ error: 'Sintoma not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new SintomaController();