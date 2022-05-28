const { Verifier } = require('../src');
const { anyone } = require('../src');
test('isUsername', () => {
	expect(new Verifier('username').isUsername().correct).toBe(true);
	expect(new Verifier('$username').isUsername().correct).toBe(false);
	expect(new Verifier('username').isUsername(/\w+/).correct).toBe(true);
}, 500);
test('isPassword', () => {
	expect(new Verifier('secret').isPassword().correct).toBe(false);
	expect(new Verifier('secreT@123').isPassword().correct).toBe(true);
	expect(new Verifier('secret').isPassword({ hello: /.+/ }).correct).toBe(true);
});
test('isEmail', () => {
	expect(new Verifier('wrongEmail').isEmail().correct).toBe(false);
	expect(new Verifier('example@domain.com').isEmail().correct).toBe(true);
	expect(
		new Verifier('example@domain.com').isEmail(/^\w{1,}@\w{1,}(.\w{1,5})+/)
			.correct
	).toBe(true);
});
test('Chain', () => {
	expect(
		new Verifier('Hello').isUsername().isLengthen('gt4').details
	).toStrictEqual({ length: true, start: true, syntax: true });
	expect(
		new Verifier('Hello').isUsername().isLengthen('gt4').correct
	).toStrictEqual(true);
	expect(
		new Verifier('username').isUsername().isLengthen('gt4 lt30').array()
	).toStrictEqual([
		['start', 'syntax', 'length'],
		[true, true, true],
	]);
});
test('isLengthen', () => {
	expect(new Verifier('hello').isLengthen(5).correct).toBe(true);
	expect(new Verifier('lt15').isLengthen('lt5').correct).toBe(true);
	expect(new Verifier('greaterthan').isLengthen('gt4').correct).toBe(true);
	expect(new Verifier('both').isLengthen('gt4 lt10').correct).toBe(false);
	expect(() => {
		new Verifier('length not given').isLengthen();
	}).toThrow(new Error('Verifier.isLengthen: lengthRequired not Specified'));
});
test('consistOf', () => {
	expect(
		new Verifier('helloG@123 ').consistOf({
			lowercaseAlpha: true,
			numbers: true,
			uppercaseAlpha: true,
			symbols: true,
			whitespace: true,
		}).correct
	).toBe(true);
	expect(
		new Verifier('vakharia_heet').consistOf({
			custom: '-_',
			lowercaseAlpha: true,
		}).correct
	).toBe(true);
	expect(
		new Verifier('HELLO').consistOf({
			uppercaseAlpha: true,
		}).correct
	).toBe(true);
});
test('ageCalc', () => {
	expect(new Verifier('2005-02-22').ageCalc()).toBe(17);
	expect(new Verifier('2000-02-22').ageCalc()).toBe(22);
	expect(() => {
		new Verifier('Wrong Date').ageCalc();
	}).toThrow(new Error('Verifier.ageCalc:Invalid Date'));
});

test('includes', () => {
	expect(new Verifier('Hello Buddy! ').includes('Hello').correct).toBe(true);
	expect(new Verifier('Hello Buddy! ').includes(anyone('naa')).correct).toBe(
		false
	);
	expect(() => {
		new Verifier('Errrrrrrr').includes(anyone());
	}).toThrow(new Error('verifierjs.anyone vstr not specified'));
	expect(() => {
		new Verifier('Errrrrrrr').includes();
	}).toThrow(new Error('Verifier.includes vstr not specified'));
});
test('excludes', () => {
	expect(new Verifier('Hello Buddy! ').excludes('Hello').correct).toBe(false);
	expect(new Verifier('Hello Buddy! ').excludes(anyone('naa')).correct).toBe(
		true
	);
	expect(() => {
		new Verifier('Errrrrrrr').excludes();
	}).toThrow(new Error('Verifier.excludes vstr not specified'));
});
test('isLink', () => {
	expect(new Verifier('https://www.google.com').isLink().correct).toBe(true);
	expect(new Verifier('https://www.google.com').isLink(/^http/).correct).toBe(
		true
	);
	expect(
		new Verifier('https://www.google.com').isLink(/^https/).details.link
	).toBe(true);
});
test('startsWith', () => {
	expect(new Verifier('Hello Buddy!').startsWith('Hello').correct).toBe(true);
	expect(new Verifier('Hello Buddy!').startsWith(anyone('naa')).correct).toBe(
		false
	);
	expect(
		new Verifier('Hello Buddy!').startsWith(/^\w{1,}/i, true).correct
	).toBe(true);

	expect(() => {
		new Verifier('Errrrrrrr').startsWith();
	}).toThrow(new Error('Verifier.startsWith: vstr not specified'));
});
test('endsWith', () => {
	expect(new Verifier('Hello Buddy!').endsWith('Buddy!').correct).toBe(true);
	expect(new Verifier('Hello Buddy!').endsWith(anyone('naa')).correct).toBe(
		false
	);
	expect(new Verifier('Hello Buddy').endsWith(/\w{1,}$/i, true).correct).toBe(
		true
	);
	expect(() => {
		new Verifier('Errrrrrrr').endsWith();
	}).toThrow(new Error('Verifier.endsWith: vstr not specified'));
});
