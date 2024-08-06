import { Request, Response } from 'express';
import ParametroDetService from '../services/parametroDetService';

class ParametroDetController {
  async createParametroDet(req: Request, res: Response): Promise<Response> {
    try {
      const parametroDet = await ParametroDetService.createParametroDet(req.body);
      return res.status(201).json(parametroDet);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllParametroDets(req: Request, res: Response): Promise<Response> {
    try {
      const parametroDets = await ParametroDetService.getAllParametroDets();
      return res.status(200).json(parametroDets);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getParametroDetById(req: Request, res: Response): Promise<Response> {
    try {
      const parametroDet = await ParametroDetService.getParametroDetById(Number(req.params.id));
      if (parametroDet) {
        return res.status(200).json(parametroDet);
      } else {
        return res.status(404).json({ error: 'ParametroDet not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getParametroDetsByCabId(req: Request, res: Response): Promise<Response> {
    try {
      const parametroDets = await ParametroDetService.getParametroDetsByCabId(Number(req.params.parametro_cab_id));
      return res.status(200).json(parametroDets);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getParametroDetsByDescripcion(req: Request, res: Response): Promise<Response> {
    try {
      const parametroDets = await ParametroDetService.getParametroDetsByDescripcion(req.params.descripcion);
      return res.status(200).json(parametroDets);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateParametroDet(req: Request, res: Response): Promise<Response> {
    try {
      const updatedParametroDet = await ParametroDetService.updateParametroDet(Number(req.params.id), req.body);
      if (updatedParametroDet[0] > 0) {
        return res.status(200).json(updatedParametroDet[1][0]);
      } else {
        return res.status(404).json({ error: 'ParametroDet not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteParametroDet(req: Request, res: Response): Promise<Response> {
    try {
      const deletedParametroDet = await ParametroDetService.deleteParametroDet(Number(req.params.id));
      if (deletedParametroDet[0] > 0) {
        return res.status(200).json(deletedParametroDet[1][0]);
      } else {
        return res.status(404).json({ error: 'ParametroDet not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ParametroDetController();