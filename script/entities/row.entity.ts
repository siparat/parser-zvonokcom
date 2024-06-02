import { RowSheetType } from '../core/common/sheet.interface';

export class RowEntity {
	date: Date;
	sitename: string;
	userEmail: string;
	comment: string;
	status: string;
	phone: string;
	email: string;
	visitId: number;

	constructor(row: RowSheetType) {
		const transformedDate = row[0]
			.slice(5, -1)
			.split(',')
			.map((i) => Number(i)) as [number, number, number, number, number, number];
		this.date = new Date(...transformedDate);
		this.sitename = row[1];
		this.userEmail = row[2];
		this.comment = row[3];
		this.status = row[4];
		if (row[5].toString().length !== 11) {
			throw new Error('Формат номера телефона неверный, укажите в виде: 7**********');
		}
		this.phone = '+' + row[5].toString();
		this.email = row[6];
		this.visitId = row[7];
	}
}
