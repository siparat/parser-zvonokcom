import { RowSheetType } from '../../../common/sheet.interface';
import { RowEntity } from '../../../../entities/row.entity';
import { IResponse } from '../../response.types';
import { GetSheetBuilder } from './get-sheet.builder';
import { GetSheetTypes } from './get-sheet.types';

export class GetSheetResponse implements IResponse<GetSheetTypes.Request, GetSheetTypes.Response> {
	async send(options?: GetSheetTypes.Request): Promise<GetSheetTypes.Response> {
		if (!options) {
			throw new Error('Необходимо передать данные для запроса');
		}
		const builder = new GetSheetBuilder().setSpreadsheetId(options.id);
		const url = builder.build();

		const res = await fetch(url);
		const text = await res.text();
		const json = JSON.parse(text.slice(47, -2));
		const rows: RowSheetType[] = json.table.rows.map((row: { c: { v: RowSheetType }[] }) =>
			row.c.map((cell: { v: RowSheetType }) => (cell ? cell.v : ''))
		);
		const entities = rows.map((r) => new RowEntity(r));
		return { entities };
	}
}
