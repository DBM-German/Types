export type PickFunctions<T> = { [x in keyof T]: T[x] extends (...args: unknown[]) => unknown ? T[x] : never };

export type PickAsyncFunctions<T> = { [x in keyof T]: T[x] extends (...args: unknown[]) => Promise<unknown> ? T[x] : never };

/**
 * Array with known used indeces / length
 *
 * @example
 * let foo: FixIndecesArray<0 | 1, string[]>;
 */
export type FixIndecesArray<K extends number, T extends unknown[]> = Pick<T,K> & Omit<never[],K>;

/**
 * Array whose items are bound to a specific type (used to validate const arrays)
 */
export type TypedArray<T, A extends T[]> = A;

/**
 * Object with keys based on an union type and different value types per key (used to validate const objects)
 */
export type UnionObject<T extends string | number | symbol, R extends Record<T, unknown>> = { [x in T]: R[x] };

/**
 * Type can occur as is or in an array
 */
export type OnceOrArray<T> = T | T[];

/**
 * Regular value or non-nullable default
 *
 * @example
 * function foo<D>(defaultValue?: D): RegularOrDefault<any, D> {
 *     // Some code
 * }
 *
 * foo(); // any
 * foo("Default"); // string
 */
export type RegularOrDefault<R, D> = D extends NonNullable<D> ? D : R;
