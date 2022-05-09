import { Nil, PredicateOrGuard } from './UtilityTypes';

interface OptionLike<T> {
	isDefined(): boolean;

	filter<S extends T = T>(predicate: PredicateOrGuard<T, S>): Option<S>;

	flatMap<U>(mapper: (value: T) => Option<U>): Option<U>;

	map<U>(mapper: (value: T) => U): Option<U>;

	orElse(defaultValue: T): T;

	orElseGet(getDefaultValue: () => T): T;

	getUnsafe(): T;
}

export class None<T> implements OptionLike<T> {
	isDefined(): this is Some<T> {
		return false;
	}

	filter<S extends T>(): Option<S> {
		return new None<S>();
	}

	flatMap<U>(): Option<U> {
		return new None<U>();
	}

	map<U>(): Option<U> {
		return new None<U>();
	}

	orElse(defaultValue: T): T {
		return defaultValue;
	}

	orElseGet(getDefautValue: () => T): T {
		return getDefautValue();
	}

	getUnsafe(): T {
		throw new Error('accessing value on none type');
	}
}

export class Some<T> implements OptionLike<T> {
	constructor(private readonly _value: T) {}
	isDefined(): this is Some<T> {
		return true;
	}

	filter<S extends T>(predicate: PredicateOrGuard<T, S>): Option<S> {
		return predicate(this._value) ? new Some(this._value) : new None<S>();
	}

	flatMap<U>(mapper: (value: T) => Option<U>): Option<U> {
		return mapper(this._value);
	}

	map<U>(mapper: (value: T) => U): Option<U> {
		return new Some(mapper(this._value));
	}

	orElse(): T {
		return this._value;
	}

	orElseGet(): T {
		return this._value;
	}

	getUnsafe(): T {
		return this._value;
	}

	value(): T {
		return this._value;
	}
}

export const some = <T>(value: T): Option<T> => new Some(value);
export const none = <T>(): Option<T> => new None<T>();

export const optionOfNullable = <T>(value: T | Nil): Option<T> => {
	if (value == null || value === undefined) {
		return none();
	}
	return some(value);
};

export type Option<T> = Some<T> | None<T>;
