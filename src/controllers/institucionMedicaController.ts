import { Request, Response } from 'express';
import InstitucionMedicaService from '../services/institucionMedicaService';

class InstitucionMedicaController {
  async createInstitucionMedica(req: Request, res: Response): Promise<Response> {
    try {
      const institucionMedica = await InstitucionMedicaService.createInstitucionMedica(req.body);
      return res.status(201).json(institucionMedica);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllInstitucionesMedicas(req: Request, res: Response): Promise<Response> {
    try {
      const institucionesMedicas = await InstitucionMedicaService.getAllInstitucionesMedicas();
      return res.status(200).json(institucionesMedicas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getInstitucionMedicaById(req: Request, res: Response): Promise<Response> {
    try {
      const institucionMedica = await InstitucionMedicaService.getInstitucionMedicaById(Number(req.params.id));
      if (institucionMedica) {
        return res.status(200).json(institucionMedica);
      } else {
        return res.status(404).json({ error: 'InstitucionMedica not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getInstitucionesMedicasByParams(req: Request, res: Response): Promise<Response> {
    try {
      const institucionesMedicas = await InstitucionMedicaService.getInstitucionesMedicasByParams(req.body);
      return res.status(200).json(institucionesMedicas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateInstitucionMedica(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await InstitucionMedicaService.updateInstitucionMedica(Number(req.params.id), req.body);
      if (updated) {
        const updatedInstitucionMedica = await InstitucionMedicaService.getInstitucionMedicaById(Number(req.params.id));
        return res.status(200).json(updatedInstitucionMedica);
      } else {
        return res.status(404).json({ error: 'InstitucionMedica not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteInstitucionMedica(req: Request, res: Response): Promise<Response> {
    try {
      const [deleted] = await InstitucionMedicaService.deleteInstitucionMedica(Number(req.params.id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ error: 'InstitucionMedica not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new InstitucionMedicaController();