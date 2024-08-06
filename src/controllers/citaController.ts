import { Request, Response } from 'express';
import CitaService from '../services/citaService';

class CitaController {
  async createCita(req: Request, res: Response): Promise<Response> {
    try {
      const cita = await CitaService.createCita(req.body);
      return res.status(201).json(cita);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllCitas(req: Request, res: Response): Promise<Response> {
    try {
      const citas = await CitaService.getAllCitas();
      return res.status(200).json(citas);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCitaById(req: Request, res: Response): Promise<Response> {
    try {
      const cita = await CitaService.getCitaById(Number(req.params.id));
      if (cita) {
        return res.status(200).json(cita);
      } else {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCitasByParams(req: Request, res: Response): Promise<Response> {
    try {
      const citas = await CitaService.getCitasByParams(req.query);
      return res.status(200).json(citas);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateCita(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await CitaService.updateCita(Number(req.params.id), req.body);
      if (updated) {
        const updatedCita = await CitaService.getCitaById(Number(req.params.id));
        return res.status(200).json(updatedCita);
      }
      throw new Error('Cita no encontrada');
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteCita(req: Request, res: Response): Promise<Response> {
    try {
      const [deleted] = await CitaService.deleteCita(Number(req.params.id));
      if (deleted) {
        return res.status(204).send();
      }
      throw new Error('Cita no encontrada');
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new CitaController();