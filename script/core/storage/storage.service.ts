import { join } from 'path';
import { IStorage } from './storage.types';
import { homedir } from 'os';
import { readFileSync, writeFileSync } from 'fs';
import { statSync } from 'fs';

export class StorageService {
	private pathToFile: string;

	constructor() {
		this.pathToFile = join(homedir(), '.schedule-service.json');
		this.ensureFile(this.pathToFile);
	}

	save(key: keyof IStorage, value: IStorage[typeof key]): void {
		const object = this.read();
		const newObject = { ...object, [key]: value };
		writeFileSync(this.pathToFile, JSON.stringify(newObject, null, 2));
	}

	get<T>(key: keyof IStorage): T {
		const object = this.read();
		const value = object[key];
		return value as T;
	}

	read(): IStorage {
		try {
			return JSON.parse(readFileSync(this.pathToFile, 'utf-8'));
		} catch (error) {
			error instanceof Error && console.warn('Предупреждение при чтении файла: ' + error.message);
			return {};
		}
	}

	private async ensureFile(path: string): Promise<void> {
		try {
			statSync(path);
		} catch (error) {
			writeFileSync(path, '{}');
		}
	}
}
