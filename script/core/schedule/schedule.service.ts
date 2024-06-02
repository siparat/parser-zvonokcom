import { Job, scheduleJob } from 'node-schedule';

export class ScheduleService {
	everyMinute(name: string, cb: () => void): Job {
		const cron = '* * * * *';
		console.log(`[1] Активирован cron – ${name}`);
		return scheduleJob(name, cron, () => cb.apply(cb));
	}

	everyTenMinutes(name: string, cb: () => void): Job {
		const cron = '*/10 * * * *';
		console.log(`[10] Активирован cron – ${name}`);
		return scheduleJob(name, cron, () => cb.apply(cb));
	}

	everyHour(name: string, cb: () => void): Job {
		const now = new Date();
		const cron = `${now.getSeconds()} ${now.getMinutes()} * * *`;
		console.log(`[60] Активирован cron – ${name}`);
		return scheduleJob(name, cron, () => cb.apply(cb));
	}
}
