import { Request, Response } from 'express';
import MedicoService from '../services/medicoService';

class MedicoController {
  async createMedico(req: Request, res: Response): Promise<Response> {
    try {
      const medico = await MedicoService.createMedico(req.body);
      return res.status(201).json(medico);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllMedicos(req: Request, res: Response): Promise<Response> {
    try {
      const medicos = await MedicoService.getAllMedicos();
      return res.status(200).json(medicos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getMedicoById(req: Request, res: Response): Promise<Response> {
    try {
      const medico = await MedicoService.getMedicoById(Number(req.params.id));
      if (medico) {
        return res.status(200).json(medico);
      } else {
        return res.status(404).json({ error: 'Medico not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getMedicosByParams(req: Request, res: Response): Promise<Response> {
    try {
      const medicos = await MedicoService.getMedicosByParams(req.body);
      return res.status(200).json(medicos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateMedico(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await MedicoService.updateMedico(Number(req.params.id), req.body);
      if (updated) {
        const updatedMedico = await MedicoService.getMedicoById(Number(req.params.id));
        return res.status(200).json(updatedMedico);
      } else {
        return res.status(404).json({ error: 'Medico not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteMedico(req: Request, res: Response): Promise<Response> {
    try {
      const [deleted] = await MedicoService.deleteMedico(Number(req.params.id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ error: 'Medico not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new MedicoController();