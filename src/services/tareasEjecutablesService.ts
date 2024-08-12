import parser from 'cron-parser';
import ConsultaService from './consultaService';
import ConsultaEnfermedadService from './consultaEnfermedadService';
import MedicoService from './medicoService';
import EnfermedadService from './enfermedadService';
import InstitucionMedicaService from './institucionMedicaService';
import UtilService from './utilService';
import ProvinciaService from '../services/provinciaService';
import ciudadService from './ciudadService';
import Caso from '../entities/Caso';
import casoService from './casoService';
import enviroment from '../config/enviroment';

class ExecutableTasks {
    async analizarEnfermedadesIngresadas(fechaCorte?: Date) {
        try {
            console.log('Ejecutando tarea de analisis de enfermedades ingresadas');

            var caso = new Caso()
            var lista_casos: Caso[] = [];
            const fechaActual = new Date();

            if(!fechaCorte)
            {
                var interval = parser.parseExpression(String(enviroment.ILLNESSES_TASK_SCHEDULE));
                fechaCorte = interval.prev().toDate();
            }

            const consultasIngresadas = await ConsultaService.getAllConsultaBetween(fechaCorte, fechaActual);
            console.log('Se encontraron ' + consultasIngresadas.length + ' consultas para validar');

            for (const consulta of consultasIngresadas) {

                const consultaEnfermedad = await ConsultaEnfermedadService.findOneByParams({ consulta_id: consulta.id_consulta });
                const enfermedad = await EnfermedadService.findOneByParams({ id_enfermedad: consultaEnfermedad?.enfermedad_id });
                const medico = await MedicoService.getOneMedicoByParams({ id_medico: consulta.medico_id });
                const institucion = await InstitucionMedicaService.getOneInstitucionMedicaByParams({ id_institucion_medica: medico?.institucion_medica_id });

                var lat = institucion?.coordenada_x;
                var lng = institucion?.coordenada_y;
                
                if (typeof lat === 'undefined' || typeof lng === 'undefined') {
                    throw new Error('No se obtuvieron las coordenas para la institucion: '+ institucion?.nombre);
                }

                const ubicacion = await UtilService.getUbicacionByLatLng(+lat, +lng, 'ciudad');
                var provincia_geocod = ubicacion?.datos && UtilService.getTerminoGeocodificacion('provincia', ubicacion.datos)
                var ciudad_geocod = ubicacion?.nombre

                const provincia = await ProvinciaService.findOneByParams({nombre_provincia: provincia_geocod, estado: 'activo'})

                var ciudad = await ciudadService.findOneByParams({nombre_ciudad: ciudad_geocod, estado: 'activo'})

                if(!ciudad)
                {
                    ciudad = await ciudadService.create({ id_provincia: provincia?.id_provincia || 25, nombre_ciudad: ciudad_geocod});
                }
                
                if(!ciudad?.id_ciudad){
                    throw new Error('No se pudo obtener correctamente los datos de la ciudad')
                }
                var casoEncontrado = lista_casos.find(item => item.id_ciudad === ciudad?.id_ciudad && item.id_enfermedad === enfermedad?.id_enfermedad);

                if (casoEncontrado) {
                    // Si existe, sumar el número de casos
                    if (casoEncontrado.cantidad_casos !== undefined) {
                        casoEncontrado.cantidad_casos += 1;
                    }
                } else {
                    caso.id_ciudad = ciudad?.id_ciudad ?? 0;
                    caso.id_enfermedad = enfermedad?.id_enfermedad ?? 0;
                    caso.cantidad_casos = 1;
                    lista_casos.push(caso);
                }
            }

            for (const caso_nuevo of lista_casos) {
                const casoExistente = await casoService.findOneByParams({ id_ciudad: caso_nuevo.id_ciudad, id_enfermedad: caso_nuevo.id_enfermedad, estado: 'activo' });
                if (casoExistente) {
                    casoExistente.cantidad_casos = (casoExistente.cantidad_casos || 0) + (caso_nuevo.cantidad_casos ?? 0);
                    await casoExistente.save();
                    console.log('Se actualiza el contador del caso: '+casoExistente.id_caso+' nuevos casos: '+caso_nuevo.cantidad_casos +' numero de casos actual: '+casoExistente.cantidad_casos)
                } else {
                    const nuevoCaso = new Caso();
                    nuevoCaso.id_ciudad = caso_nuevo.id_ciudad;
                    nuevoCaso.id_enfermedad = caso_nuevo.id_enfermedad;
                    nuevoCaso.cantidad_casos = caso_nuevo.cantidad_casos;
                    await nuevoCaso.save();
                    console.log('Se crea un nuevo caso')
                }
            }
            console.log('Tarea finalizada correctamente :)');
        } catch (error) {
            console.log('Ocurrió un error al ejecutar la tarea, detalles: ' + error);
        }
        console.log('Se finaliza la tarea de analisis de enfermedades ingresadas');
    }
    
}

export default new ExecutableTasks();
