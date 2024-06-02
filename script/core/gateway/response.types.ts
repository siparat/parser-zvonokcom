export interface IResponse<Req, Res> {
	send(options: Req): Promise<Res>;
	send(): Promise<Res>;
}

export interface IBuilder<T> {
	build(): T;
}
