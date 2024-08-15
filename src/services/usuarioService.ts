import usuarioRepository from '../repositories/usuarioRepository';
import jwt from 'jsonwebtoken';
import medicoUsuarioService from "./medicoUsuarioService";

class UsuarioService {
    async createUsuario(usuario: any): Promise<any> {
        return await usuarioRepository.create(usuario);
    }

    async getUsuarios(): Promise<any[]> {
        return await usuarioRepository.findAll();
    }

    async getUsuarioById(id: number): Promise<any> {
        return await usuarioRepository.findById(id);
    }

    async getUsuarioByParams(params: any): Promise<any> {
        return await usuarioRepository.findOneByParams(params);
    }

    async updateUsuario(id: number, updates: any): Promise<any> {
        const [affectedCount, affectedRows] = await usuarioRepository.update(id, updates);
        if (affectedCount === 0) {
            throw new Error('Usuario no encontrado');
        }
        return affectedRows[0];
    }

    async deleteUsuario(id: number): Promise<any> {
        const [affectedCount, affectedRows] = await usuarioRepository.delete(id);
        if (affectedCount === 0) {
            throw new Error('Usuario no encontrado');
        }
        return affectedRows[0];
    }

    async authenticateUsuario(email: string, password: string): Promise<any> {
        const usuario = await usuarioRepository.findOneByParams({email: email});
        const tokenObj = {
            id: 0,
            email: "",
            rol: "",
            medico_id: 0
        };
        if (!usuario) {
            return null;
        } else {
            const isPasswordValid = password === usuario.contraseña;
            if (!isPasswordValid) {
                return null;
            }

            tokenObj.id = usuario.id_usuario;
            tokenObj.email = usuario.email;
            tokenObj.rol = usuario.rol;
            if (usuario.rol === 'MEDICO') {
                const medidoObj = await medicoUsuarioService.getOneMedicoUsuarioByParams({usuario_id: usuario.id_usuario});
                if (medidoObj) {
                    tokenObj.medico_id = medidoObj.medico_id;
                }
            }
        }

        const token = jwt.sign(tokenObj, '123456789', {expiresIn: '1h', algorithm: 'HS256', encoding: 'utf-8'});
        const encodedToken = encodeURIComponent(token);

        return token;

    }
}

export default new UsuarioService();