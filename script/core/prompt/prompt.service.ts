import inquirer from 'inquirer';
import { InputType } from './prompt.types';

export class PromptService {
	async input<T extends string | number | boolean>(message: string, type: InputType = 'input'): Promise<T> {
		const { response } = await inquirer.prompt<{ response: T }>([{ type, message, name: 'response' }]);
		return response;
	}
}
