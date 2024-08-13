import { Request, Response } from 'express';
import MedicoUsuarioService from '../services/medicoUsuarioService';
import { MedicoUsuarioCreationAttributes } from '../entities/MedicoUsuario';

class MedicoUsuarioController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const medicoUsuarioData: MedicoUsuarioCreationAttributes = req.body;
      const newMedicoUsuario = await MedicoUsuarioService.createMedicoUsuario(medicoUsuarioData);
      return res.status(201).json(newMedicoUsuario);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const medicoUsuarios = await MedicoUsuarioService.getAllMedicoUsuarios();
      return res.status(200).json(medicoUsuarios);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { medico_id, usuario_id } = req.params;
      const medicoUsuario = await MedicoUsuarioService.getMedicoUsuarioById(Number(medico_id), Number(usuario_id));
      if (medicoUsuario) {
        return res.status(200).json(medicoUsuario);
      } else {
        return res.status(404).json({ error: 'MedicoUsuario not found' });
      }
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getByParams(req: Request, res: Response): Promise<Response> {
    try {
      const params: Partial<MedicoUsuarioCreationAttributes> = req.query;
      const medicoUsuarios = await MedicoUsuarioService.getMedicoUsuariosByParams(params);
      return res.status(200).json(medicoUsuarios);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { medico_id, usuario_id } = req.params;
      const updates: Partial<MedicoUsuarioCreationAttributes> = req.body;
      const [updatedCount, updatedMedicoUsuarios] = await MedicoUsuarioService.updateMedicoUsuario(Number(medico_id), Number(usuario_id), updates);
      if (updatedCount > 0) {
        return res.status(200).json(updatedMedicoUsuarios);
      } else {
        return res.status(404).json({ error: 'MedicoUsuario not found' });
      }
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { medico_id, usuario_id } = req.params;
      const [deletedCount, deletedMedicoUsuarios] = await MedicoUsuarioService.deleteMedicoUsuario(Number(medico_id), Number(usuario_id));
      if (deletedCount > 0) {
        return res.status(200).json(deletedMedicoUsuarios);
      } else {
        return res.status(404).json({ error: 'MedicoUsuario not found' });
      }
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new MedicoUsuarioController();