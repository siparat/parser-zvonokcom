import { Api } from '../../../../configs/api.config';
import { IBuilder } from '../../response.types';

export class GetSheetBuilder implements IBuilder<string> {
	private id: string;

	setSpreadsheetId(id: string): this {
		this.id = id;
		return this;
	}

	build(): string {
		return `${Api.GOOGLE_SPREADSHEETS}/${this.id}/gviz/tq?tqx=out:json`;
	}
}
