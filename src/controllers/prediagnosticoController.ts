import { Request, Response } from 'express';
import prediagnosticoService from '../services/prediagnosticoService';
import { log } from 'console';

class PrediagnosticoController {
  public async generarPrediagnostico(req: Request, res: Response): Promise<void> {
    try {
      const { sintomas, nombre, filePath,x,y } = req.body;
      if (!sintomas) {
        res.status(400).json({ error: 'Los síntomas son requeridos' });
        return;
      }
      if (!nombre) {
        res.status(400).json({ error: 'El nombre es requerido' });
        return;
      }
      const resultado = await prediagnosticoService.generarPrediagnostico(nombre,sintomas,filePath,x,y);
      res.status(200).json(resultado);
    } catch (error) {
        log(error);
      res.status(500).json({ error: 'Error al generar el prediagnóstico' });
    }
  }
}

export default new PrediagnosticoController();