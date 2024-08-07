import { Request, Response } from 'express';
import EnfermedadSintomaService from '../services/enfermedadSintomaService';

class EnfermedadSintomaController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const enfermedadSintoma = await EnfermedadSintomaService.create(req.body);
      return res.status(201).json(enfermedadSintoma);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const enfermedadesSintomas = await EnfermedadSintomaService.findAll();
      return res.status(200).json(enfermedadesSintomas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { enfermedad_id, sintoma_id } = req.params;
      const enfermedadSintoma = await EnfermedadSintomaService.findById(Number(enfermedad_id), Number(sintoma_id));
      if (enfermedadSintoma) {
        return res.status(200).json(enfermedadSintoma);
      }
      return res.status(404).json({ message: 'EnfermedadSintoma not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { enfermedad_id, sintoma_id } = req.params;
      const updates = req.body;
      const [updated] = await EnfermedadSintomaService.update(Number(enfermedad_id), Number(sintoma_id), updates);
      if (updated) {
        const updatedEnfermedadSintoma = await EnfermedadSintomaService.findById(Number(enfermedad_id), Number(sintoma_id));
        return res.status(200).json(updatedEnfermedadSintoma);
      }
      return res.status(404).json({ message: 'EnfermedadSintoma not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { enfermedad_id, sintoma_id } = req.params;
      const [deleted] = await EnfermedadSintomaService.delete(Number(enfermedad_id), Number(sintoma_id));
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ message: 'EnfermedadSintoma not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new EnfermedadSintomaController();