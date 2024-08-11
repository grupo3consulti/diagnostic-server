import { Request, Response } from 'express';
import CiudadService from '../services/ciudadService';

class CiudadController {
  async createCiudad(req: Request, res: Response): Promise<Response> {
    try {
      const ciudad = await CiudadService.create(req.body);
      return res.status(201).json(ciudad);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllCiudades(req: Request, res: Response): Promise<Response> {
    try {
      const ciudades = await CiudadService.findAll();
      return res.status(200).json(ciudades);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCiudadById(req: Request, res: Response): Promise<Response> {
    try {
      const ciudad = await CiudadService.findById(Number(req.params.id_ciudad));
      if (ciudad) {
        return res.status(200).json(ciudad);
      } else {
        return res.status(404).json({ message: 'Ciudad no encontrada' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCiudadesByParams(req: Request, res: Response): Promise<Response> {
    try {
      const ciudades = await CiudadService.findByParams(req.body);
      return res.status(200).json(ciudades);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateCiudad(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await CiudadService.update(Number(req.params.id_ciudad), req.body);
      if (updated) {
        const updatedCiudad = await CiudadService.findById(Number(req.params.id_ciudad));
        return res.status(200).json(updatedCiudad);
      }
      throw new Error('Ciudad no encontrada');
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteCiudad(req: Request, res: Response): Promise<Response> {
    try {
      const [deleted] = await CiudadService.delete(Number(req.params.id_ciudad));
      if (deleted) {
        return res.status(204).send();
      }
      throw new Error('Ciudad no encontrada');
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new CiudadController();
