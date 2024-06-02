import { RowEntity } from '../../../../entities/row.entity';

export namespace GetSheetTypes {
	export interface Request {
		id: string;
	}

	export interface Response {
		entities: RowEntity[];
	}
}
