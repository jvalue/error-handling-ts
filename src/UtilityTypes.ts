export type PredicateOrGuard<T, S extends T = T> =
	| ((value: T) => boolean)
	| ((value: T) => value is S);

export type Nil = null | undefined;
