import { Request, Response } from 'express';
import CasoService from '../services/casoService';

class CasoController {
  async createCaso(req: Request, res: Response): Promise<Response> {
    try {
      const caso = await CasoService.create(req.body);
      return res.status(201).json(caso);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllCasos(req: Request, res: Response): Promise<Response> {
    try {
      const casos = await CasoService.findAll();
      return res.status(200).json(casos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCasoById(req: Request, res: Response): Promise<Response> {
    try {
      const caso = await CasoService.findById(Number(req.params.id_caso));
      if (caso) {
        return res.status(200).json(caso);
      } else {
        return res.status(404).json({ message: 'Caso no encontrado' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCasosByParams(req: Request, res: Response): Promise<Response> {
    try {
      const casos = await CasoService.findByParams(req.body);
      return res.status(200).json(casos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateCaso(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await CasoService.update(Number(req.params.id_caso), req.body);
      if (updated) {
        const updatedCaso = await CasoService.findById(Number(req.params.id_caso));
        return res.status(200).json(updatedCaso);
      }
      throw new Error('Caso no encontrado');
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteCaso(req: Request, res: Response): Promise<Response> {
    try {
      const [deleted] = await CasoService.delete(Number(req.params.id));
      if (deleted) {
        return res.status(204).send();
      }
      throw new Error('Caso no encontrado');
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new CasoController();