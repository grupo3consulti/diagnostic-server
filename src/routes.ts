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
import consultaEnfermedadController from './controllers/consultaEnfermedadController';
import enfermedadController from './controllers/enfermedadController';
import resultadoExamenController from './controllers/resultadoExamenController';
import enfermedadSintomaController from './controllers/enfermedadSintomaController';
import ciudadController from './controllers/ciudadController';
import provinciaController from './controllers/provinciaController';
import casoController from './controllers/casoController';
import multer from 'multer';

const upload = multer();
const router = Router();

// Rutas para usuarios
router.post('/usuarios', usuarioController.createUsuario);
router.get('/usuarios', usuarioController.getUsuarios);
router.get('/usuarios/:id', usuarioController.getUsuarioById);
router.post('/usuarios/search', usuarioController.getUsuarioByParams);
router.put('/usuarios/:id', usuarioController.updateUsuario);
router.delete('/usuarios/:id', usuarioController.deleteUsuario);
router.post('/usuarios/login', usuarioController.login);

// Rutas para síntomas
router.post('/sintomas', sintomaController.createSintoma);
router.get('/sintomas', sintomaController.getAllSintomasGeneradosIaFirst);
router.get('/sintomas/:id', sintomaController.getSintomaById);
router.post('/sintomas/search', sintomaController.getSintomasByParams);
router.put('/sintomas/:id', sintomaController.updateSintoma);
router.delete('/sintomas/:id', sintomaController.deleteSintoma);

// Rutas para consulta de síntomas
router.post('/consultaSintomas', consultaSintomaController.createConsultaSintoma);
router.get('/consultaSintomas', consultaSintomaController.getAllConsultaSintomas);
router.get('/consultaSintomas/:id', consultaSintomaController.getConsultaSintomaById);
router.post('/consultaSintomas/search', consultaSintomaController.getConsultaSintomasByParams);
router.put('/consultaSintomas/:id', consultaSintomaController.updateConsultaSintoma);
router.delete('/consultaSintomas/:id', consultaSintomaController.deleteConsultaSintoma);

// Rutas para instituciones médicas
router.post('/institucionesMedicas', institucionMedicaController.createInstitucionMedica);
router.get('/institucionesMedicas', institucionMedicaController.getAllInstitucionesMedicas);
router.get('/institucionesMedicas/:id', institucionMedicaController.getInstitucionMedicaById);
router.post('/institucionesMedicas/search', institucionMedicaController.getInstitucionesMedicasByParams);
router.put('/institucionesMedicas/:id', institucionMedicaController.updateInstitucionMedica);
router.delete('/institucionesMedicas/:id', institucionMedicaController.deleteInstitucionMedica);

// Rutas para médicos
router.post('/medicos', medicoController.createMedico);
router.get('/medicos', medicoController.getAllMedicos);
router.get('/medicos/:id', medicoController.getMedicoById);
router.post('/medicos/search', medicoController.getMedicosByParams);
router.put('/medicos/:id', medicoController.updateMedico);
router.delete('/medicos/:id', medicoController.deleteMedico);

// Rutas para citas
router.post('/citas', citaController.createCita);
router.get('/citas', citaController.getAllCitas);
router.get('/citas/:id', citaController.getCitaById);
router.post('/citas/search', citaController.getCitasByParams);
router.put('/citas/:id', citaController.updateCita);
router.delete('/citas/:id', citaController.deleteCita);

// Rutas para consultas auditorias
router.post('/consultasAuditorias', consultaAuditoriaController.createConsultaAuditoria);
router.get('/consultasAuditorias', consultaAuditoriaController.getAllConsultaAuditorias);
router.get('/consultasAuditorias/:id', consultaAuditoriaController.getConsultaAuditoriaById);
router.post('/consultasAuditorias/search', consultaAuditoriaController.getConsultaAuditoriasByParams);
router.put('/consultasAuditorias/:id', consultaAuditoriaController.updateConsultaAuditoria);

// Rutas para consultas
router.post('/consultas', upload.single('filePath'), consultaController.createConsulta);
router.get('/consultas', consultaController.getAllConsultas);
router.get('/consultas/:id', consultaController.getConsultaById);
router.post('/consultas/search', consultaController.getConsultasByParams);
router.put('/consultas/:id', consultaController.updateConsulta);
router.delete('/consultas/:id', consultaController.deleteConsulta);
router.get('/consultas/between', consultaController.getAllConsultaBetween);
router.get('/consultas/details/:cita_id', consultaController.getConsultaDetailsByCitaId);

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
router.post('/prediagnostico', upload.single('filePath'), prediagnosticoController.generarPrediagnostico);

// Rutas para consulta de enfermedades
router.post('/consultaEnfermedades', consultaEnfermedadController.create);
router.get('/consultaEnfermedades', consultaEnfermedadController.findAll);
router.get('/consultaEnfermedades/:consulta_id/:enfermedad_id', consultaEnfermedadController.findById);
router.put('/consultaEnfermedades/:consulta_id/:enfermedad_id', consultaEnfermedadController.update);
router.delete('/consultaEnfermedades/:consulta_id/:enfermedad_id', consultaEnfermedadController.delete);

// Rutas para enfermedades
router.post('/enfermedades', enfermedadController.create);
router.get('/enfermedades', enfermedadController.findAll);
router.get('/enfermedades/:id', enfermedadController.findById);
router.put('/enfermedades/:id', enfermedadController.update);
router.delete('/enfermedades/:id', enfermedadController.delete);

// Rutas para resultados de exámenes
router.post('/resultadosExamenes', resultadoExamenController.create);
router.get('/resultadosExamenes', resultadoExamenController.findAll);
router.get('/resultadosExamenes/:id', resultadoExamenController.findById);
router.put('/resultadosExamenes/:id', resultadoExamenController.update);
router.delete('/resultadosExamenes/:id', resultadoExamenController.delete);

// Rutas para enfermedad-síntoma
router.post('/enfermedadesSintomas', enfermedadSintomaController.create);
router.get('/enfermedadesSintomas', enfermedadSintomaController.findAll);
router.get('/enfermedadesSintomas/:enfermedad_id/:sintoma_id', enfermedadSintomaController.findById);
router.put('/enfermedadesSintomas/:enfermedad_id/:sintoma_id', enfermedadSintomaController.update);
router.delete('/enfermedadesSintomas/:enfermedad_id/:sintoma_id', enfermedadSintomaController.delete);

// Rutas para las ciudades
router.post('/ciudad', ciudadController.createCiudad)
router.get('/ciudades', ciudadController.getAllCiudades)
router.get('/ciudad/:id_ciudad', ciudadController.getCiudadById);
router.put('/ciudad/:id_ciudad', ciudadController.updateCiudad);
router.delete('/ciudad/:id_ciudad', ciudadController.deleteCiudad);

// Rutas para las provincias
router.post('/provincia', provinciaController.createProvincia)
router.get('/provincias', provinciaController.getAllProvincias)
router.get('/provincia/:id_provincia', provinciaController.getProvinciaById);
router.put('/provincia/:id_provincia', provinciaController.updateProvincia);
router.delete('/provincia/:id_provincia', provinciaController.deleteProvincia);

// Rutas para los casos
router.post('/caso', casoController.createCaso)
router.get('/casos', casoController.getAllCasos)
router.get('/caso/:id_caso', casoController.getCasoById);
router.put('/caso/:id_caso', casoController.updateCaso);
router.delete('/caso/:id_caso', casoController.deleteCaso);

// Semaforo
router.get('/semaforo', casoController.semaforo)

export default router;