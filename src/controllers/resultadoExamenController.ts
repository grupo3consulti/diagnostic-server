import { Request, Response } from 'express';
import ResultadoExamenService from '../services/resultadoExamenService';

class ResultadoExamenController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const resultadoExamen = await ResultadoExamenService.create(req.body);
      return res.status(201).json(resultadoExamen);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const resultadosExamen = await ResultadoExamenService.findAll();
      return res.status(200).json(resultadosExamen);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const resultadoExamen = await ResultadoExamenService.findById(Number(id));
      if (resultadoExamen) {
        return res.status(200).json(resultadoExamen);
      }
      return res.status(404).json({ message: 'ResultadoExamen not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const [updated] = await ResultadoExamenService.update(Number(id), updates);
      if (updated) {
        const updatedResultadoExamen = await ResultadoExamenService.findById(Number(id));
        return res.status(200).json(updatedResultadoExamen);
      }
      return res.status(404).json({ message: 'ResultadoExamen not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const [deleted] = await ResultadoExamenService.delete(Number(id));
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ message: 'ResultadoExamen not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ResultadoExamenController();