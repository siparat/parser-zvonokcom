#!/usr/bin/env node
import { GatewayService } from './core/gateway/gateway.service';
import { PromptService } from './core/prompt/prompt.service';
import { ScheduleService } from './core/schedule/schedule.service';
import { StorageService } from './core/storage/storage.service';
import { Script } from './script';

const log = console.log;
console.log = function (message: unknown): void {
	const now = new Date();
	log(
		'\x1b[36m%s\x1b[0m',
		`${now.getDate()}-${now.getMonth() + 1} ${now.getHours()}:${now.getMinutes()}`,
		'\x1b[0m',
		message
	);
};

const bootstrap = async (): Promise<void> => {
	const scheduleService = new ScheduleService();
	const storageService = new StorageService();
	const promptService = new PromptService();
	const gatewayService = new GatewayService();

	const script = new Script(promptService, storageService, gatewayService, scheduleService);
	await script.run();
};

bootstrap();
