import {
	RECEIVED_COLOR,
	getLabelPrinter,
	matcherErrorMessage,
	matcherHint,
	printExpected,
	printReceived,
	printWithType,
} from 'jest-matcher-utils';

import { Result, isResult } from '..';

/**
 * Custom jest matcher for Result.
 * Main resource for development was https://haspar.us/notes/adding-jest-custom-matchers-in-typescript.
 * @param this A context given to us by jest
 * @param received The received object
 * @returns A message and if the matcher passed
 */
export function toBeSuccessfulResult(
	this: jest.MatcherContext,
	received: unknown,
): jest.CustomMatcherResult {
	const matcherName = 'toBeSuccessful';
	const options: jest.MatcherHintOptions = {
		isNot: this.isNot,
		promise: this.promise,
	};

	if (!isResult(received)) {
		throw new Error(
			matcherErrorMessage(
				matcherHint(matcherName, String(received), undefined, options),
				`${RECEIVED_COLOR('received')} value must be a Result`,
				printWithType('Received', received, printReceived),
			),
		);
	}

	const pass = received.isSuccess();
	const message = (): string => {
		const isNot = this.isNot;
		const labelExpected = 'Expected result';
		const labelReceived = 'Received result';

		const printLabel = getLabelPrinter(labelExpected, labelReceived);

		const hint = matcherHint(matcherName, 'Result', '', options) + '\n\n';

		const expectedMessage =
			printLabel(labelExpected) +
			(isNot ? 'not ' : ' ') +
			printExpected(true) +
			'\n';

		const receivedMessage =
			printLabel(labelReceived) + (isNot ? '    ' : ' ') + printReceived(pass);

		const errors = received.isFailure()
			? '\n\nReceived errors:\n' + RECEIVED_COLOR(received.errors().join('\n'))
			: '';

		return hint + expectedMessage + receivedMessage + errors;
	};
	return { message, pass };
}

expect.extend({ toBeSuccessfulResult });

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		// eslint-disable-next-line @typescript-eslint/ban-types
		interface Matchers<R, T = {}> {
			toBeSuccessfulResult: T extends Result<unknown>
				? () => R
				: 'Type-level Error: Received value must be Result';
		}
	}
}

export default undefined;
