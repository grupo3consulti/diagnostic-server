import cron from 'node-cron';
import enviroment from '../../src/config/enviroment'
import ExecutableTasks from '../../src/services/tareasEjecutablesService';

cron.schedule(String(enviroment.ILLNESSES_TASK_SCHEDULE), () => {
    ExecutableTasks.analizarEnfermedadesIngresadas();
});