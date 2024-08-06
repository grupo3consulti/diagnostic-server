import { Request, Response } from 'express';
import ParametroCabService from '../services/parametroCabService';

class ParametroCabController {
  async createParametroCab(req: Request, res: Response): Promise<Response> {
    try {
      const parametroCab = await ParametroCabService.createParametroCab(req.body);
      return res.status(201).json(parametroCab);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllParametroCabs(req: Request, res: Response): Promise<Response> {
    try {
      const parametroCabs = await ParametroCabService.getAllParametroCabs();
      return res.status(200).json(parametroCabs);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getParametroCabById(req: Request, res: Response): Promise<Response> {
    try {
      const parametroCab = await ParametroCabService.getParametroCabById(Number(req.params.id));
      if (parametroCab) {
        return res.status(200).json(parametroCab);
      } else {
        return res.status(404).json({ error: 'ParametroCab not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateParametroCab(req: Request, res: Response): Promise<Response> {
    try {
      const [affectedRows, updatedParametroCabs] = await ParametroCabService.updateParametroCab(Number(req.params.id), req.body);
      if (affectedRows > 0) {
        return res.status(200).json(updatedParametroCabs[0]);
      } else {
        return res.status(404).json({ error: 'ParametroCab not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteParametroCab(req: Request, res: Response): Promise<Response> {
    try {
      const [affectedRows, deletedParametroCabs] = await ParametroCabService.deleteParametroCab(Number(req.params.id));
      if (affectedRows > 0) {
        return res.status(200).json(deletedParametroCabs[0]);
      } else {
        return res.status(404).json({ error: 'ParametroCab not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ParametroCabController();