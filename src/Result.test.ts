import { failure, success } from './Result';

describe('Success', () => {
	it('should be a success', () => {
		const s = success(123);
		expect(s.isSuccess()).toBe(true);
	});

	it('should be no failure', () => {
		const s = success(123);
		expect(s.isFailure()).toBe(false);
	});

	it('should apply map', () => {
		const s = success(123);
		const mapped = s.map((x) => x > 5);
		expect(mapped.isSuccess()).toBe(true);
		expect(mapped.getUnsafe()).toBe(true);
	});
});

describe('Failure', () => {
	it('should be a failure', () => {
		const f = failure('failure');
		expect(f.isSuccess()).toBe(false);
	});

	it('should be no success', () => {
		const f = failure('failure');
		expect(f.isFailure()).toBe(true);
	});

	it('should apply map', () => {
		const f = failure('failure');
		const mapped = f.map(() => false);
		expect(mapped.isSuccess()).toBe(false);
		expect(() => {
			mapped.getUnsafe();
		}).toThrow(Error);
	});
});
