/**
 * Array with known used indeces / length
 *
 * @example
 * let foo: FixIndecesArray<string, 0 | 1>;
 */
export type FixIndecesArray<T, K extends keyof T[]> = Pick<T[],K> & Omit<never[],K>;

/**
 * Object with keys based on an union type and different value types per key
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
