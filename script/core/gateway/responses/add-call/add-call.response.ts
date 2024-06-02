import { Api } from '../../../../configs/api.config';
import { IResponse } from '../../response.types';
import { AddCallBuilder } from './add-call.builder';
import { AddCallTypes } from './add-call.types';

export class AddCallResponse implements IResponse<AddCallTypes.Request, AddCallTypes.Response> {
	async send(options?: AddCallTypes.Request): Promise<AddCallTypes.Response> {
		if (!options) {
			throw new Error('Необходимо передать данные для запроса');
		}

		const builder = new AddCallBuilder();
		builder
			.setPublicKey(options.publicKey)
			.setCampaignId(options.campaignId)
			.setComment(options.entity.comment)
			.setEmail(options.entity.userEmail)
			.setPhone(options.entity.phone)
			.setStatusName(options.entity.status);

		const params = builder.build();
		const res = await fetch(Api.ADD_CALL, {
			method: 'POST',
			body: params,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});
		const body = await res.json();
		return { result: body };
	}
}
