import { RowEntity } from './entities/row.entity';
import { GatewayService } from './core/gateway/gateway.service';
import { PromptService } from './core/prompt/prompt.service';
import { ScheduleService } from './core/schedule/schedule.service';
import { StorageService } from './core/storage/storage.service';
import { isValidHttpUrl } from './helpers/http.helper';

export class Script {
	constructor(
		private promptService: PromptService,
		private storageService: StorageService,
		private gatewayService: GatewayService,
		private scheduleService: ScheduleService
	) {}

	async getCampaignId(): Promise<string> {
		const last = this.storageService.get<string | undefined>('campaignId');
		if (last && (await this.promptService.input<boolean>(`Выбрать предыдущий id компании? (${last}) `, 'confirm'))) {
			return last;
		}

		const id = await this.promptService.input<string>('Введите id компании: ', 'input');
		this.storageService.save('campaignId', id);
		return id;
	}

	async getPublicKey(): Promise<string> {
		const lastKey = this.storageService.get<string | undefined>('key');
		if (lastKey && (await this.promptService.input<boolean>(`Выбрать предыдущий ключ? (****): `, 'confirm'))) {
			return Buffer.from(lastKey, 'base64').toString('utf-8');
		}

		const key = await this.promptService.input<string>('Введите секретный ключ (скрыто): ', 'password');
		this.storageService.save('key', Buffer.from(key, 'utf-8').toString('base64'));
		return key;
	}

	async getUrl(): Promise<string> {
		const lastUrl = this.storageService.get<string | undefined>('url');
		if (lastUrl && (await this.promptService.input<boolean>(`Выбрать предыдущую ссылку? (${lastUrl}): `, 'confirm'))) {
			return lastUrl;
		}

		const url = await this.promptService.input<string>('Введите ссылку на таблицу (вместе с https): ', 'input');
		if (!isValidHttpUrl(url)) {
			throw new Error('Указана не валидная ссылка');
		}
		this.storageService.save('url', url);
		return url;
	}

	addLogVisitId(id: number): void {
		const arr = this.storageService.get<number[] | undefined>('visitsId');
		this.storageService.save('visitsId', (arr || []).concat(id));
	}

	async addCalls(key: string, campaignId: string, entities: RowEntity[]): Promise<void> {
		if (!entities.length) {
			console.log('Новых записей не обнаружено');
		}
		for (const entity of entities) {
			const callId = await this.gatewayService.addCall(key, campaignId, entity);
			this.addLogVisitId(entity.visitId);
			console.log(`[${callId}] Успешно добавлен звонок (${entity.phone})`);
		}
	}

	async getRowEntities(id: string): Promise<RowEntity[]> {
		const pushedId = this.storageService.get<number[] | undefined>('visitsId') || [];
		return (await this.gatewayService.getSheet(id)).entities.filter((e) => !pushedId.includes(e.visitId));
	}

	async addCallsCallback(sheetId: string, key: string, campaignId: string): Promise<void> {
		const entities = await this.getRowEntities(sheetId);
		await this.addCalls(key, campaignId, entities);
	}

	async run(): Promise<void> {
		const key = await this.getPublicKey();
		const url = await this.getUrl();
		const campaignId = await this.getCampaignId();
		const sheetId = url.split('/d/')[1].split('/')[0];

		this.scheduleService.everyTenMinutes('Add Calls', async () => this.addCallsCallback(sheetId, key, campaignId));
	}
}
