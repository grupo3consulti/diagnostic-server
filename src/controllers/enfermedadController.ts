import { Request, Response } from 'express';
import EnfermedadService from '../services/enfermedadService';

class EnfermedadController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const enfermedad = await EnfermedadService.create(req.body);
      return res.status(201).json(enfermedad);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const enfermedades = await EnfermedadService.findAll();
      return res.status(200).json(enfermedades);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const enfermedad = await EnfermedadService.findById(Number(id));
      if (enfermedad) {
        return res.status(200).json(enfermedad);
      }
      return res.status(404).json({ message: 'Enfermedad not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const [updated] = await EnfermedadService.update(Number(id), updates);
      if (updated) {
        const updatedEnfermedad = await EnfermedadService.findById(Number(id));
        return res.status(200).json(updatedEnfermedad);
      }
      return res.status(404).json({ message: 'Enfermedad not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const [deleted] = await EnfermedadService.delete(Number(id));
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ message: 'Enfermedad not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new EnfermedadController();