import { Request, Response } from 'express';
import ConsultaAuditoriaService from '../services/consultaAuditoriaService';

class ConsultaAuditoriaController {
  async createConsultaAuditoria(req: Request, res: Response): Promise<Response> {
    try {
      const consultaAuditoria = await ConsultaAuditoriaService.createConsultaAuditoria(req.body);
      return res.status(201).json(consultaAuditoria);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllConsultaAuditorias(req: Request, res: Response): Promise<Response> {
    try {
      const consultaAuditorias = await ConsultaAuditoriaService.getAllConsultaAuditorias();
      return res.status(200).json(consultaAuditorias);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getConsultaAuditoriaById(req: Request, res: Response): Promise<Response> {
    try {
      const consultaAuditoria = await ConsultaAuditoriaService.getConsultaAuditoriaById(Number(req.params.id));
      if (consultaAuditoria) {
        return res.status(200).json(consultaAuditoria);
      } else {
        return res.status(404).json({ message: 'Consulta Auditoria no encontrada' });
      }
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getConsultaAuditoriasByParams(req: Request, res: Response): Promise<Response> {
    try {
      const consultaAuditorias = await ConsultaAuditoriaService.getConsultaAuditoriasByParams(req.query);
      return res.status(200).json(consultaAuditorias);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateConsultaAuditoria(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await ConsultaAuditoriaService.updateConsultaAuditoria(Number(req.params.id), req.body);
      if (updated) {
        const updatedConsultaAuditoria = await ConsultaAuditoriaService.getConsultaAuditoriaById(Number(req.params.id));
        return res.status(200).json(updatedConsultaAuditoria);
      }
      throw new Error('Consulta Auditoria no encontrada');
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ConsultaAuditoriaController();