import { Router } from 'express';
import usuarioController from './controllers/usuarioController';
import sintomaController from './controllers/sintomaController';
import consultaSintomaController from './controllers/consultaSintomaController';
import institucionMedicaController from './controllers/institucionMedicaController';
import medicoController from './controllers/medicoController';
import citaController from './controllers/citaController';
import consultaAuditoriaController from './controllers/consultaAuditoriaController';
import consultaController from './controllers/consultaController';
import parametroCabController from './controllers/parametroCabController';
import parametroDetController from './controllers/parametroDetController';
import prediagnosticoController from './controllers/prediagnosticoController';

const router = Router();

// Rutas para usuarios
router.post('/usuarios', usuarioController.createUsuario);
router.get('/usuarios', usuarioController.getUsuarios);
router.get('/usuarios/:id', usuarioController.getUsuarioById);
router.get('/usuarios/search', usuarioController.getUsuarioByParams);
router.put('/usuarios/:id', usuarioController.updateUsuario);
router.delete('/usuarios/:id', usuarioController.deleteUsuario);
router.post('/usuarios/login', usuarioController.login);

// Rutas para síntomas
router.post('/sintomas', sintomaController.createSintoma);
router.get('/sintomas', sintomaController.getAllSintomas);
router.get('/sintomas/:id', sintomaController.getSintomaById);
router.get('/sintomas/search', sintomaController.getSintomasByParams);
router.put('/sintomas/:id', sintomaController.updateSintoma);
router.delete('/sintomas/:id', sintomaController.deleteSintoma);

// Rutas para consulta de síntomas
router.post('/consultaSintomas', consultaSintomaController.createConsultaSintoma);
router.get('/consultaSintomas', consultaSintomaController.getAllConsultaSintomas);
router.get('/consultaSintomas/:id', consultaSintomaController.getConsultaSintomaById);
router.get('/consultaSintomas/search', consultaSintomaController.getConsultaSintomasByParams);
router.put('/consultaSintomas/:id', consultaSintomaController.updateConsultaSintoma);
router.delete('/consultaSintomas/:id', consultaSintomaController.deleteConsultaSintoma);

// Rutas para instituciones médicas
router.post('/institucionesMedicas', institucionMedicaController.createInstitucionMedica);
router.get('/institucionesMedicas', institucionMedicaController.getAllInstitucionesMedicas);
router.get('/institucionesMedicas/:id', institucionMedicaController.getInstitucionMedicaById);
router.get('/institucionesMedicas/search', institucionMedicaController.getInstitucionesMedicasByParams);
router.put('/institucionesMedicas/:id', institucionMedicaController.updateInstitucionMedica);
router.delete('/institucionesMedicas/:id', institucionMedicaController.deleteInstitucionMedica);

// Rutas para médicos
router.post('/medicos', medicoController.createMedico);
router.get('/medicos', medicoController.getAllMedicos);
router.get('/medicos/:id', medicoController.getMedicoById);
router.get('/medicos/search', medicoController.getMedicosByParams);
router.put('/medicos/:id', medicoController.updateMedico);
router.delete('/medicos/:id', medicoController.deleteMedico);

// Rutas para citas
router.post('/citas', citaController.createCita);
router.get('/citas', citaController.getAllCitas);
router.get('/citas/:id', citaController.getCitaById);
router.get('/citas/search', citaController.getCitasByParams);
router.put('/citas/:id', citaController.updateCita);
router.delete('/citas/:id', citaController.deleteCita);

// Rutas para consultas auditorias
router.post('/consultasAuditorias', consultaAuditoriaController.createConsultaAuditoria);
router.get('/consultasAuditorias', consultaAuditoriaController.getAllConsultaAuditorias);
router.get('/consultasAuditorias/:id', consultaAuditoriaController.getConsultaAuditoriaById);
router.get('/consultasAuditorias/search', consultaAuditoriaController.getConsultaAuditoriasByParams);
router.put('/consultasAuditorias/:id', consultaAuditoriaController.updateConsultaAuditoria);

// Rutas para consultas
router.post('/consultas', consultaController.createConsulta);
router.get('/consultas', consultaController.getAllConsultas);
router.get('/consultas/:id', consultaController.getConsultaById);
router.get('/consultas/search', consultaController.getConsultasByParams);
router.put('/consultas/:id', consultaController.updateConsulta);
router.delete('/consultas/:id', consultaController.deleteConsulta);

// Rutas para parámetros cabecera
router.post('/parametrosCab', parametroCabController.createParametroCab);
router.get('/parametrosCab', parametroCabController.getAllParametroCabs);
router.get('/parametrosCab/:id', parametroCabController.getParametroCabById);
router.put('/parametrosCab/:id', parametroCabController.updateParametroCab);
router.delete('/parametrosCab/:id', parametroCabController.deleteParametroCab);

// Rutas para parámetros detalle
router.post('/parametrosDet', parametroDetController.createParametroDet);
router.get('/parametrosDet', parametroDetController.getAllParametroDets);
router.get('/parametrosDet/:id', parametroDetController.getParametroDetById);
router.get('/parametrosDet/cab/:parametro_cab_id', parametroDetController.getParametroDetsByCabId);
router.put('/parametrosDet/:id', parametroDetController.updateParametroDet);
router.delete('/parametrosDet/:id', parametroDetController.deleteParametroDet);

// Rutas para prediagnostico
router.post('/prediagnostico', prediagnosticoController.generarPrediagnostico);
export default router;