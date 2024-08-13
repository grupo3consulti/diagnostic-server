import { Request, Response } from 'express';
import ProvinciaService from '../services/provinciaService';

class ProvinciaController {
  async createProvincia(req: Request, res: Response): Promise<Response> {
    try {
      const provincia = await ProvinciaService.create(req.body);
      return res.status(201).json(provincia);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllProvincias(req: Request, res: Response): Promise<Response> {
    try {
      const provincias = await ProvinciaService.findAll();
      return res.status(200).json(provincias);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getProvinciaById(req: Request, res: Response): Promise<Response> {
    try {
      const provincia = await ProvinciaService.findById(Number(req.params.id_provincia));
      if (provincia) {
        return res.status(200).json(provincia);
      } else {
        return res.status(404).json({ message: 'Provincia no encontrada' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getProvinciasByParams(req: Request, res: Response): Promise<Response> {
    try {
      const provincias = await ProvinciaService.findByParams(req.body);
      return res.status(200).json(provincias);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateProvincia(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await ProvinciaService.update(Number(req.params.id_provincia), req.body);
      if (updated) {
        const updatedProvincia = await ProvinciaService.findById(Number(req.params.id_provincia));
        return res.status(200).json(updatedProvincia);
      }
      throw new Error('Provincia no encontrada');
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteProvincia(req: Request, res: Response): Promise<Response> {
    try {
      const [deleted] = await ProvinciaService.delete(Number(req.params.id_provincia));
      if (deleted) {
        return res.status(204).send();
      }
      throw new Error('Provincia no encontrada');
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ProvinciaController();