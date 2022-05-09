import { Nil, PredicateOrGuard } from './UtilityTypes';

interface ResultLike<T> {
	isSuccess(): this is Success<T>;
	isFailure(): this is Failure;

	filter<S extends T = T>(
		predicate: PredicateOrGuard<T, S>,
		errorMessage: string,
	): Result<S>;

	flatMap<U>(mapper: (value: T) => Result<U>): Result<U>;

	map<U>(mapper: (value: T) => U): Result<U>;

	getUnsafe(): T;
}

export class Success<T> implements ResultLike<T> {
	constructor(private readonly _data: T) {}

	isSuccess(): this is Success<T> {
		return true;
	}

	isFailure(): this is Failure {
		return false;
	}

	filter<S extends T = T>(
		predicate: PredicateOrGuard<T, S>,
		errorMessage: string,
	): Result<S> {
		return predicate(this._data)
			? new Success(this._data)
			: new Failure([errorMessage]);
	}

	flatMap<U>(mapper: (value: T) => Result<U>): Result<U> {
		return mapper(this._data);
	}

	map<U>(mapper: (value: T) => U): Result<U> {
		return new Success(mapper(this._data));
	}

	getUnsafe(): T {
		return this._data;
	}

	data(): T {
		return this._data;
	}

	errors(): string[] {
		throw new Error('accessing errors on success type');
	}
}

export class Failure implements ResultLike<never> {
	constructor(private readonly _errors: string[]) {}

	isSuccess(): this is Success<never> {
		return false;
	}

	isFailure(): this is Failure {
		return true;
	}

	filter<T, S extends T>(
		predicate: PredicateOrGuard<T, S>,
		errorMessage: string,
	): Result<S> {
		return new Failure([...this._errors, errorMessage]);
	}

	flatMap<U>(): Result<U> {
		return new Failure(this._errors);
	}

	map<U>(): Result<U> {
		return new Failure(this._errors);
	}

	getUnsafe(): never {
		throw new Error('accessing data on failure type');
	}

	errors(): string[] {
		return this._errors;
	}
}

export const success = <T>(data: T): Result<T> => new Success(data);
export const failure = <T>(...errors: string[]): Result<T> =>
	new Failure(errors);

export const isResult = <T>(result: unknown): result is Result<T> => {
	return result instanceof Success || result instanceof Failure;
};

export const resultOfNullable = <T>(
	value: T | Nil,
	errorMessage: string,
): Result<T> => {
	if (value == null || value === undefined) {
		return failure(errorMessage);
	}
	return success(value);
};

export type Result<T> = Success<T> | Failure;
