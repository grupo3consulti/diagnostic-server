import { Request, Response } from 'express';
import prediagnosticoService from '../services/prediagnosticoService';
import { log } from 'console';
import UtilService from '../services/utilService';

class PrediagnosticoController {
  public async generarPrediagnostico(req: Request, res: Response): Promise<void> {
    try {
      var { sintomas, nombre,x,y } = req.body;
      var archivo = null;

      if(req.file){
        archivo = req.file
      }

     
      if (!sintomas) {
        res.status(400).json({ error: 'Los síntomas son requeridos' });
        return;
      }
      if(UtilService.isValidJSON(sintomas)){
        sintomas = JSON.parse(sintomas)
      }else{
        sintomas = [sintomas]
      }
      
      if (!nombre) {
        res.status(400).json({ error: 'El nombre es requerido' });
        return;
      }
      const resultado = await prediagnosticoService.generarPrediagnostico(nombre,sintomas,archivo,x,y);
      res.status(200).json(resultado);
    } catch (error) {
        log(error);
      res.status(500).json({ error: 'Error al generar el prediagnóstico: '+error });
    }
  }
}

export default new PrediagnosticoController();