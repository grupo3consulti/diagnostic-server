import { Request, Response } from 'express';
import usuarioService from '../services/usuarioService';

class UsuarioController {
  async createUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuario = await usuarioService.createUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await usuarioService.getUsuarios();
      res.status(200).json(usuarios);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUsuarioById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.getUsuarioById(Number(id));
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUsuarioByParams(req: Request, res: Response): Promise<void> {
    try {
      const params = req.query;
      const usuario = await usuarioService.getUsuarioByParams(params);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const usuario = await usuarioService.updateUsuario(Number(id), updates);
      res.status(200).json(usuario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.deleteUsuario(Number(id));
      res.status(200).json(usuario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const token = await usuarioService.authenticateUsuario(email, password);

      if (!token) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

}

export default new UsuarioController();