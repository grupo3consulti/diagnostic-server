import { Request, Response } from 'express';
import ConsultaService from '../services/consultaService';

class ConsultaController {
  async createConsulta(req: Request, res: Response): Promise<Response> {
    try {
      const consulta = await ConsultaService.createConsulta(req.body);
      return res.status(201).json(consulta);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllConsultas(req: Request, res: Response): Promise<Response> {
    try {
      const consultas = await ConsultaService.getAllConsultas();
      return res.status(200).json(consultas);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getConsultaById(req: Request, res: Response): Promise<Response> {
    try {
      const consulta = await ConsultaService.getConsultaById(Number(req.params.id));
      if (consulta) {
        return res.status(200).json(consulta);
      } else {
        return res.status(404).json({ message: 'Consulta no encontrada' });
      }
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getConsultasByParams(req: Request, res: Response): Promise<Response> {
    try {
      const consultas = await ConsultaService.getConsultasByParams(req.body);
      return res.status(200).json(consultas);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateConsulta(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await ConsultaService.updateConsulta(Number(req.params.id), req.body);
      if (updated) {
        const updatedConsulta = await ConsultaService.getConsultaById(Number(req.params.id));
        return res.status(200).json(updatedConsulta);
      }
      throw new Error('Consulta no encontrada');
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteConsulta(req: Request, res: Response): Promise<Response> {
    try {
      const [deleted] = await ConsultaService.deleteConsulta(Number(req.params.id));
      if (deleted) {
        return res.status(204).send();
      }
      throw new Error('Consulta no encontrada');
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllConsultaBetween(req: Request, res: Response): Promise<Response> {
    try {
      const consultas = await ConsultaService.getAllConsultaBetween(new Date(req.body.fecha_ini), new Date(req.body.fecha_fin));
      return res.status(200).json(consultas);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getConsultaDetailsByCitaId(req: Request, res: Response): Promise<Response> {
    try {
      const details = await ConsultaService.getConsultaDetailsByCitaId(Number(req.params.cita_id));
      return res.status(200).json(details);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }
  
}

export default new ConsultaController();