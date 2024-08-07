import { Request, Response } from 'express';
import ConsultaEnfermedadService from '../services/consultaEnfermedadService';

class ConsultaEnfermedadController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const consultaEnfermedad = await ConsultaEnfermedadService.create(req.body);
      return res.status(201).json(consultaEnfermedad);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const consultasEnfermedad = await ConsultaEnfermedadService.findAll();
      return res.status(200).json(consultasEnfermedad);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { consulta_id, enfermedad_id } = req.params;
      const consultaEnfermedad = await ConsultaEnfermedadService.findById(Number(consulta_id), Number(enfermedad_id));
      if (consultaEnfermedad) {
        return res.status(200).json(consultaEnfermedad);
      }
      return res.status(404).json({ message: 'ConsultaEnfermedad not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { consulta_id, enfermedad_id } = req.params;
      const updates = req.body;
      const [updated] = await ConsultaEnfermedadService.update(Number(consulta_id), Number(enfermedad_id), updates);
      if (updated) {
        const updatedConsultaEnfermedad = await ConsultaEnfermedadService.findById(Number(consulta_id), Number(enfermedad_id));
        return res.status(200).json(updatedConsultaEnfermedad);
      }
      return res.status(404).json({ message: 'ConsultaEnfermedad not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { consulta_id, enfermedad_id } = req.params;
      const [deleted] = await ConsultaEnfermedadService.delete(Number(consulta_id), Number(enfermedad_id));
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ message: 'ConsultaEnfermedad not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ConsultaEnfermedadController();