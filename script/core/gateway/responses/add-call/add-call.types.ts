import { RowEntity } from '../../../../entities/row.entity';

export namespace AddCallTypes {
	interface SuccessResult {
		call_id: number;
		phone: string;
		balance: string;
		created: string;
	}

	interface FailResult {
		status: string;
		data: string;
	}

	export interface Request {
		publicKey: string;
		campaignId: string;
		entity: RowEntity;
	}

	export interface Response {
		result: SuccessResult | FailResult;
	}
}
