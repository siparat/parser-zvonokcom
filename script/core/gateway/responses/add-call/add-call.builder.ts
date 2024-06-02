import { IBuilder } from '../../response.types';

export class AddCallBuilder implements IBuilder<URLSearchParams> {
	private params = new URLSearchParams();

	setPublicKey(key: string): this {
		this.params.append('public_key', key);
		return this;
	}

	setPhone(phone: string): this {
		this.params.append('phone', phone);
		return this;
	}

	setCampaignId(id: string): this {
		this.params.append('campaign_id', id);
		return this;
	}

	setComment(comment: string): this {
		this.params.append('text', comment);
		return this;
	}

	setStatusName(status: string): this {
		this.params.append('status_name', status);
		return this;
	}

	setEmail(email: string): this {
		this.params.append('ivr_lvl_1_btn_1_email', email);
		return this;
	}

	build(): URLSearchParams {
		return this.params;
	}
}
