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
import iAService from './iAService';
import messageService from './messageService';
import enfermedadService from './enfermedadService';
import sintomaService from './sintomaService';
import enfermedadSintomaService from './enfermedadSintomaService';
import parametroCabService from './parametroCabService';
import ParametroCab from '../entities/ParametroCab';
import parametroDetService from './parametroDetService';

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
    
    async generarEnfermedadesEnTendencia(ubicacion?: string)
    {
        var countParDetnuevos = 0
        try {
            console.log('Ejecutando tarea de generacion de enfermedades');

            if(!ubicacion){
                ubicacion = 'Ecuador'
            }
            var parametroCab = await parametroCabService.findOneByParams({descripcion: 'ENFERMEDADES_GENERADAS_POR_IA', estado:'activo'})

            if(!parametroCab)
            {
                parametroCab = await parametroCabService.createParametroCab({descripcion: 'ENFERMEDADES_GENERADAS_POR_IA', estado:'activo'})
            }
            if(!parametroCab)
            {
                throw new Error('No se pudo obtener el parametro cabecera')
            }

            var parametrosDet = await parametroDetService.getParametroDetsByCabId(parametroCab.id_parametro_cab)

            for (const parametroDet of parametrosDet) {
                await parametroDetService.deleteParametroDet(parametroDet.id_parametro_det)
            }

            const mensaje: { role: 'system' | 'user'; content: string }[] = [
                { role: 'system', content: 'Eres un experto epidemiologo.' },
                { role: 'user', content: 'Cuales son las enfermedades que actualmente estan en tendencia en '+ubicacion }];

            const outputFormat = {
                type: "json_schema",
                json_schema: {
                    name: "enfermedades_tendencia",
                    schema: {
                        type: "object",
                        properties: {
                            enfermedades: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        nombre_enfermedad: { type: "string" },
                                        tipo_enfermedad: { type: "string" },
                                        sintomas: {
                                            type: "array",
                                            items: {
                                                type: "string"
                                            }
                                        }
                                    },
                                    required: ["nombre_enfermedad", "tipo_enfermedad", "sintomas"],
                                    additionalProperties: false
                                }
                            }
                        },
                        required: ["enfermedades"],
                        additionalProperties: false
                    },
                    strict: true
                }
            };

            const response = await iAService.getStrucutredOutput(await messageService.createMessages(mensaje), outputFormat);
            
            if(UtilService.isValidJSON(response)){
                var enfermedades = JSON.parse(response)
            }
            if(!enfermedades){
                throw new Error('No se pudo obtener los datos a ingresar')
            }

            for (const enfermedad_generada of enfermedades.enfermedades) {
                //Validar si la enferemedad existe
                var enfermedad = await enfermedadService.findOneByParams({nombre: enfermedad_generada.nombre_enfermedad, estado: 'activo' })

                if(!enfermedad){
                    enfermedad = await enfermedadService.create({
                        nombre: enfermedad_generada.nombre_enfermedad, 
                        tipo: enfermedad_generada.tipo_enfermedad, 
                        descripcion: enfermedad_generada.nombre_enfermedad,
                        estado: 'activo',
                        usr_creacion: 'admin',
                        usr_modificacion: 'admin' })
                    
                    console.log('Se ingresa la nueva enfermedad de manera satisfactoria: '+enfermedad_generada.nombre_enfermedad)
                }

                if(!enfermedad)
                {
                    console.log('No se pudo crear la enfermedad'+enfermedad_generada.nombre_enfermedad)
                    continue;
                }
                for (const sintomas_generados of enfermedad_generada.sintomas) {
                    var sintomas = await sintomaService.getOneSintomaByParams({descripcion: sintomas_generados, estado: 'activo' })

                    if(!sintomas){
                        sintomas = await sintomaService.createSintoma({descripcion: sintomas_generados, estado:'activo', usr_creacion: 'admin'})
                    }
                    if(!sintomas){
                        console.log('No se pudo crear la enfermedad'+sintomas_generados)
                        continue;
                    }

                    var enfermedadSintoma = await enfermedadSintomaService.findOneByParams({enfermedad_id: enfermedad.id_enfermedad, sintoma_id: sintomas.id_sintoma, estado: 'activo'})
                    if(!enfermedadSintoma){
                        enfermedadSintoma = await enfermedadSintomaService.create({enfermedad_id: enfermedad.id_enfermedad, sintoma_id: sintomas.id_sintoma, estado: 'activo'})
                    }
                    if(!enfermedadSintoma){
                        console.log('No se pudo crear la relacion sintoma - enfermedad')
                        continue;
                    }

                    await parametroDetService.createParametroDet({parametro_cab_id: parametroCab.id_parametro_cab, clave: 'ENFERMEDAD_SINTOMA_IA', valor: String(enfermedadSintoma.id_enfermedad_sintoma), estado: 'activo'})
                    countParDetnuevos ++
                }
            }
            console.log('Se generaron '+countParDetnuevos+' nuevos detalles')
            console.log('Tarea finalizada correctamente :)');
        } catch (error) {
            console.log('Ocurrió un error al ejecutar la tarea, detalles: ' + error);
        }
        console.log('Se finaliza la tarea de generacion de enfermedades.');
    }
}

export default new ExecutableTasks();
