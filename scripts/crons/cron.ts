import cron from 'node-cron';
import enviroment from '../../src/config/enviroment';
import ExecutableTasks from '../../src/services/tareasEjecutablesService';

// Función para validar que las variables existen y no están vacías
function validateCronSchedule(schedule:any, variableName:string) {
    if (!schedule) {
        throw new Error(`La variable ${variableName} no está definida o está vacía. No se ejecutara la tarea correspondiente.`);
    }
}

try {
    // Validar las variables del cron
    validateCronSchedule(enviroment.ILLNESSES_TASK_SCHEDULE, 'ILLNESSES_TASK_SCHEDULE');
    validateCronSchedule(enviroment.GENERADOR_ENFERMEDADES_TASK_SCHEDULE, 'GENERADOR_ENFERMEDADES_TASK_SCHEDULE');

    // Programar las tareas si las variables son válidas
    cron.schedule(String(enviroment.ILLNESSES_TASK_SCHEDULE), () => {
        ExecutableTasks.analizarEnfermedadesIngresadas();
    });

    cron.schedule(String(enviroment.GENERADOR_ENFERMEDADES_TASK_SCHEDULE), () => {
        ExecutableTasks.generarEnfermedadesEnTendencia();
    });

} catch (error: any) {
    console.error(error.message);
}
