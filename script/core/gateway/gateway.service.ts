import { RowEntity } from '../../entities/row.entity';
import { AddCallResponse } from './responses/add-call/add-call.response';
import { GetSheetResponse } from './responses/get-sheet/get-sheet.response';
import { GetSheetTypes } from './responses/get-sheet/get-sheet.types';

export class GatewayService {
	async addCall(publicKey: string, campaignId: string, entity: RowEntity): Promise<number> {
		const response = new AddCallResponse();
		const { result } = await response.send({ publicKey, campaignId, entity });
		if ('data' in result) {
			throw new Error(`Произошла ошибка при добавлении номера ${entity.phone}. \nСообщение ошибки: ${result.data}`);
		}
		return result.call_id;
	}

	async getSheet(sheetId: string): Promise<GetSheetTypes.Response> {
		const response = new GetSheetResponse();
		const result = await response.send({ id: sheetId });
		return result;
	}
}
