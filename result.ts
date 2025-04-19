/**
 * A Result type that can be either a success or a failure.
 * 
 * usage:
 * ```ts
 * import { Result, success, failure, isSuccess } from './result';
 * const result = (() => Math.random() > 0.5 ? success('ok') : failure(new Error('error')))();
 * if (isSuccess(result)) {
 *   console.log(result.value); // ok
 * } else {
 *   console.error(result.error); // Error: error
 * }
 * ```
 */
export type Result<T, E extends Error> = Success<T> | Failure<E>;
type Success<T> = {
  state: 'success';
  value: T;
};
type Failure<E extends Error> = {
  state: 'failure';
  error: E;
};

export const success = <T>(value: T): Result<T, never> => ({ state: 'success', value });
export const failure = <E extends Error>(error: E): Result<never, E> => ({ state: 'failure', error });
export const isSuccess = <T, E extends Error>(result: Result<T, E>): result is Success<T> => result.state === 'success';
export const isFailure = <T, E extends Error>(result: Result<T, E>): result is Failure<E> => result.state === 'failure';
