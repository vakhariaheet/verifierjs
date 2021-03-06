interface errorsObj {
	[errName: string]: boolean;
}

/**
 *
 * @param lengthRequired
 * @returns upperlimit and lowerlimit
 */
const lengthRegex = (lengthRequired: number | string) => {
	let upperlimit = '',
		lowerlimit = '0';
	if (!lengthRequired) {
		throw Error('Verifier.isLengthen: lengthRequired not Specified');
	}
	if (typeof lengthRequired === 'string') {
		lengthRequired.split(' ').map((len) => {
			if (len.includes('gt')) {
				lowerlimit = (len.match(/[0-9]+/) as string[])[0];
			}
			if (len.includes('lt')) {
				upperlimit = (len.match(/[0-9]+/) as string[])[0];
			}
		});
	}
	return { upperlimit, lowerlimit };
};
/**
 * disables all regex special characters from string
 * @param regex string
 * @returns {string} regex string
 */
const regextoString = (regex: string) => {
	let newString = regex;
	const specialChars = [
		'\\',
		'^',
		'$',
		'*',
		'+',
		'.',
		'|',
		'?',
		'(',
		')',
		'[',
		']',
		'{',
		'}',
	];
	specialChars.forEach((char) => {
		newString = newString.replace(char, `\\${char}`);
	});
	return newString;
};
/**
 *
 * @param  {object} customRegexObj : custom regex object {[errName] :regex,...}
 * @param {string} value : String to verify
 * @returns {object} {[errName]:regex test result};
 */
const checkCustomRegex = (customRegexObj: any, value: string): errorsObj => {
	const errNames = Object.keys(customRegexObj);
	const errors: errorsObj = {};
	errNames.map(
		(errName) => (errors[errName] = customRegexObj[errName].test(value))
	);
	return errors;
};
/**
 * It basically tells the functions(which supports `anyone`)
 * if anyone of the character present in `vstr` is there then verify it
 *
 * - Can be used on `includes`,`excludes`,`startsWith`,`endsWith`
 * @param vstr Verification string
 * @example
 * new Verifier("heldajsjfsa").includes(anyone("hello")).correct // return true
 *
 * - // What it basically does is that it tells the includes function that if string(which is to verify) contains "h" or "e" or "l" or "o" if anyone of them does then just check if remaining functions in the chain are passed if they had then just set correct to true
 *
 * - // Same goes for excludes func check if "h" or "e" or "l" or "o" is present in the string if anyone of them does then just set correct to false
 *
 *
 */
export const anyone = (vstr: string) => {
	if (!vstr) throw Error('verifierjs.anyone vstr not specified');

	return { regex: `[${regextoString(vstr)}]` };
};

/**
 * @param {string} value string to verify for methods
 * @return {object}
 * ``` Javascript
 * {
 *  value:string;
 *  correct:Boolean; //True, if all verification func specified in the chain succeeded
 *  details:{ //Detail version of correct to check which function succeeded and which function failed
 *          [propertyName]:Boolean, //If String validates the property
 *          ...
 *         };
 * }
 *
 * ```
 */
export class Verifier {
	/** The String on which verification will be applied */
	value: string;
	/** True If the string(this.value,ie the string passed while creating new Verifier) passes all verification methods */
	correct: boolean;
	/** A detailed Form of `correct` */
	details: {
		[errorName: string]: boolean;
	};

	constructor(_value: string) {
		this.value = _value;
		this.correct = false;
		this.details = {};
	}

	/**
	 * Check if Email is valid.
	 *
	 * - Adds `email` property in `details` obj
	 * - Also affects `correct`
	 * - Also can be chained behind or before any other chainable verification methods
	 * - You can also pass custom regex
	 * @example
	 * new Verifier('example@domain.co.org').isEmail().correct => true
	 * new Verifier('wrongEmail@.co').isEmail().details.email => false
	 */
	isEmail(customRegex?: RegExp) {
		let correct: boolean = false;
		if (customRegex && customRegex instanceof RegExp) {
			correct = customRegex.test(this.value);
		} else {
			correct = /\w+@\w+\.(\w+)+/.test(this.value);
		}
		this.correct = this.#verifyCorrect(correct);
		this.details.email = correct;

		return this;
	}

	/**
	 *
	 * @param {number} length : length string
	 * - Adds `length` property in `details` obj
	 * - Also affects `correct`
	 * - Also can be chained behind or before any other chainable verification methods
	 * @example
	 * new Verifier('lowerthan 15').isLengthen("lt15").correct =>  true
	 * new Verifier('greaterthan10').isLengthen("gt10").correct => true
	 * new Verifier('merged').isLengthen("gt2 lt7").details.length => true
	 * new Verifier('exact').isLengthen(5).correct => true
	 * new Verifier("wrong").isLengthen("gt7 lt10").details.length =>  false
	 * new Verifier("short").isLengthen(7).details.length => false
	 */
	//* Checks Length of value is greater or equal to given required length
	isLengthen(length: number | string) {
		const { upperlimit, lowerlimit } = lengthRegex(length);
		let correct;
		if (typeof length === 'number') {
			correct = length === this.value.length;
			this.details.length = correct;
			this.correct = this.#verifyCorrect(correct);
			return this;
		}
		if (lowerlimit && upperlimit) {
			correct =
				Number(lowerlimit) < this.value.length &&
				this.value.length < Number(upperlimit);
		} else correct = Number(lowerlimit) < this.value.length;

		this.correct = this.#verifyCorrect(correct);
		this.details.length = correct;

		return this;
	}
	/**
	 * Checks if the value is a valid url
	 * - Adds `link` property in `details` obj
	 * - Also affects `correct`
	 * - Also can be chained behind or before any other chainable verification methods
	 * @param {RegExp} customRegex : custom regex to check (optional)
	 * @example
	 * new Verifier('https://google.com').isLink().correct => true
	 * new Verifier('https://www.google.com').isLink().correct => true
	 * new Verifier('http://example.com').isLink().details.link => true
	 * new Verifier('google.com').isLink().details.link => false
	 *
	 */
	isLink(customRegex?: RegExp) {
		let correct: boolean = false;
		if (customRegex && customRegex instanceof RegExp) {
			correct = customRegex.test(this.value);
		} else {
			correct = /(https|http):\/\/(www.)?([\w\.:])+(\.\w)+(\/([\w/-])+)?/g.test(
				this.value
			);
		}

		this.correct = this.#verifyCorrect(correct);
		this.details.link = correct;
		return this;
	}
	/**  Checks Username
	 * - Default Username syntax:
	 *    1. Username should only start with a-z,A-Z
	 *    2. Username should only contain letters, numbers, _s , -saturation ,.saturation
	 * - Adds `length`&`start` properties in `details` obj
	 * - Also affects `correct`
	 * - Also can be chained behind or before any other chainable verification methods
	 * - to update length just add isLengthen function behind this function. or custom regex
	 * @param {object} customRegexObj `optional` {[errName]:regex,...}
	 * @example
	 * new Verifier('username').isUsername().correct => true
	 * new Verifier('$wrongUsername').isUsername().correct => false
	 * new Verifier('wrong$Username').isUsername().correct => false
	 * new Verifier('3wrongUsername').isUsername().correct => true
	 * new Verifier('username',{ length:/.{4,}/,start:/^[a-zA-Z]{1,}/} ).isUsername().correct => true
	 */
	//* Checks if value is a valid username and if not returns object with errors
	isUsername(customRegexObj?: object) {
		let errors: errorsObj = {
			start: false,
			syntax: false,
		};
		if (customRegexObj) {
			errors = checkCustomRegex(customRegexObj, this.value);
			this.correct = this.#verifyCorrect(errors);
			this.details = {
				...this.details,
				...errors,
			};

			return this;
		}
		if (/^[a-zA-Z]+/.test(this.value)) errors.start = true;
		if (!/[`!@#$%^&*()+=[\]{};:'\\|,<>/?~]/.test(this.value))
			errors.syntax = true;
		this.correct = this.#verifyCorrect(errors);
		this.details = {
			...this.details,
			...errors,
		};

		return this;
	}

	/**
	 * Checks Password syntax
	 *  - Default Password syntax
	 *    1. must contain at least one lowercase letter
	 *    2. must contain at least one uppercase letter
	 *    3. must contain at least one symbol or number
	 *    4. length must be at least 8 characters long
	 * - Default Password syntax can be changed by passing customRegexObj as param
	 * - Adds `length`,`lowercase`,`uppercase`,`symbol` properties in `details` obj
	 * - Also affects `correct`
	 * - Also can be chained behind or before any other chainable verification methods
	 * - to update length just add isLengthen function behind this function. or custom regex
	 * @param customRegexObj `optional` {[errName]:regex,...}
	 *  @example
	 *  new Verifier('hello').isPassword().correct => false
	 *  new Verifier('secreT@123').isPassword().correct => true
	 *  new Verifier('secreT',{length:/\w{1,}/}).isPassword().correct => true
	 */
	//* Checks if value is a valid password and returns errors object
	isPassword(customRegexObj?: errorsObj) {
		let errors: errorsObj = {
			length: false,
			lowercase: false,
			uppercase: false,
			symbol: false,
		};
		if (customRegexObj) {
			errors = checkCustomRegex(customRegexObj, this.value);
			this.correct = this.#verifyCorrect(errors);
			this.details = errors;

			return this;
		}
		//- Checks if password contains a lowercase character, if it contains then setting lowercase in errors false
		errors.lowercase = /[a-z]/.test(this.value);
		//- Checks if password contains a uppercase character, if it contains then setting uppercase in errors false
		errors.uppercase = /[A-Z]/.test(this.value);
		//- Checks if password contains a symbol or a number, if it contains then setting symbol in errors false
		errors.symbol = /[@#$%^&*!_+\-|\\/0-9]/.test(this.value);
		//- Checks if length of password is 8 or greater, if it is then setting length in errors false
		errors.length = this.isLengthen('gt8').correct;
		this.correct = this.#verifyCorrect(errors);
		this.details = errors;

		return this;
	}

	/**
	 * Checks Whether a specific string(or set of characters if `anyone` function in passed) is present in `this.value`
	 * - Adds `includes` property in `details` obj
	 * - Also affects `correct`
	 * - Also can be chained behind or before any other chainable verification methods
	 * @param vstr Verification string which should be present in `this.value` or `anyone` function can also be passed as param
	 * @example
	 * new Verifier("hello").includes("bye").correct => false
	 * new Verifier("hello").includes(anyone("bye")).correct => true
	 * new Verifier("hey!hello").includes("hello").details.includes => true
	 */
	includes(vstr: string | { regex: string }) {
		let correct = false;
		if (!vstr) throw Error('Verifier.includes vstr not specified');
		if (typeof vstr === 'string') {
			correct = new RegExp(`${regextoString(vstr)}{1,}`).test(this.value);
		} else if (typeof vstr === 'object' && vstr.regex) {
			correct = new RegExp(`${vstr.regex}{1,}`).test(this.value);
		}
		this.details.includes = correct;
		this.correct = this.#verifyCorrect(correct);
		return this;
	}

	/**
	 * Checks Whether a specific string(or set of characters if `anyone` function in passed) is not present in `this.value`
	 * - Adds `excludes` property in `details` obj
	 * - Also affects `correct`
	 * - Also can be chained behind or before any other chainable verification methods
	 * @param vstr Verification string which should not be present in `this.value` or `anyone` function can also be passed as param
	 *  @example
	 * new Verifier("hello").excludes("bye").correct => true
	 * new Verifier("hello").excludes(anyone("bye")).correct => false
	 * new Verifier("hey!hello").excludes("hello").details.excludes => false
	 */
	excludes(vstr: string | { regex: string }) {
		if (!vstr) throw Error('Verifier.excludes vstr not specified');
		let correct: boolean = false;
		if (typeof vstr === 'string') {
			correct = !new RegExp(`${regextoString(vstr)}{1,}`).test(this.value);
		}
		if (typeof vstr === 'object' && vstr.regex) {
			correct = !new RegExp(`${vstr.regex}{1,}`).test(this.value);
		}
		this.details.excludes = correct;
		this.correct = this.#verifyCorrect(correct);
		return this;
	}
	/**
	 * Checks Whether `this.value` starts with a specific string(or set of characters if `anyone` function in passed) or specific regex
	 * @param {string | RegExp } vstr : string or regex to be matched ( you can also pass `anyone` function as param)
	 * - Adds `startsWith` property in `details` obj
	 * - Also affects `correct`
	 * - Also can be chained behind or before any other chainable verification methods
	 * @example
	 * new Verifier("hello").startsWith("h").correct => true
	 * new Verifier("hello").startsWith(anyone("hwd")).correct => true
	 *
	 *
	 */
	startsWith(vstr: string | RegExp | { regex: string }) {
		if (!vstr) throw Error('Verifier.startsWith: vstr not specified');
		let correct: boolean = false;

		if (typeof vstr === 'string') {
			correct = this.value.startsWith(regextoString(vstr));
		} else if (vstr instanceof RegExp) {
			console.log('regex', vstr);

			correct = vstr.test(this.value);
		} else if (typeof vstr === 'object' && vstr.regex) {
			correct = new RegExp(`^${vstr.regex}`).test(this.value);
		}

		this.details.startsWith = correct;
		this.correct = this.#verifyCorrect(correct);
		return this;
	}
	/**
	 * Checks Whether `this.value` ends with a specific string(or set of characters if `anyone` function in passed) or specific regex
	 * @param {string | RegExp } vstr : string or regex to be matched ( you can also pass `anyone` function as param)
	 * - Adds `endsWith` property in `details` obj
	 * - Also affects `correct`
	 * - Also can be chained behind or before any other chainable verification methods
	 * @example
	 * new Verifier("hello").endsWith("lo").correct => true
	 * new Verifier("hello").endsWith(anyone("ok")).details.endsWith => true
	 * new Verifier("hello").endsWith("w").correct => false
	 * new Verifier("hello").endsWith(anyone("nwt")).details.endsWith => false
	 **/
	endsWith(vstr: string | RegExp | { regex: string }) {
		if (!vstr) throw Error('Verifier.endsWith: vstr not specified');
		let correct: boolean = false;
		if (typeof vstr === 'string') {
			correct = this.value.endsWith(regextoString(vstr));
		} else if (vstr instanceof RegExp) {
			correct = vstr.test(this.value);
		} else if (typeof vstr === 'object' && vstr.regex) {
			correct = new RegExp(`${vstr.regex}$`).test(this.value);
		}
		this.details.endsWith = correct;
		this.correct = this.#verifyCorrect(correct);
		return this;
	}
	/**
     * - For all properties default is false
     * - Adds `consistOf` property in `details` obj
     * - Also affects `correct`
     * - Also can be chained behind or before any other chainable verification methods
     * @param strConsistOf object
     * - Default Symbols ``!@#$%^&*()_+-=~`';:.,<>/?"\|[]{}``
     *
     * {
     *    lowercaseAlpha?: boolean; //if true,then string may contain lowercase letters, if false string should not contain lowercase letters
     *
     *    uppercaseAlpha?: boolean;//if true,then string may contain uppercase letters, if false string should not contain uppercase letters
     *
     *    numbers?: boolean;//if true,then string may contain numbers , if false string should not contain numbers
     *
     *    whitespace?: boolean;//if true,then string may contain whitespace , if false string should not contain whitespace
     *
     *    symbols?: boolean;//if true,then string may contain symbols , if false string should not contain symbols
     *
     *    custom?: string; //if true,then string(i.e `this.value`) may contain characters of string(which specified as value in custom property ) , if false string should not contain characters of string(which specified as value in custom property )
     * }
     *

     *
     * @example
     *
     *new Verifier("helloG").consistOf({
     *  uppercaseAlpha:true,
     *  lowercaseAlpha:true
     *  }).correct => true
     *new Verifier("hello_G").consistOf({
     *  uppercaseAlpha:true,
     *  lowercaseAlpha:true,
     *  custom:"_-"
     *  }).correct => true
     * new Verifier("hello_G").consistOf({
     *  uppercaseAlpha:true,
     *  lowercaseAlpha:true,
     *  }).correct => false
     */
	consistOf(strConsistOf: {
		lowercaseAlpha?: boolean;
		uppercaseAlpha?: boolean;
		numbers?: boolean;
		whitespace?: boolean;
		symbols?: boolean;
		custom?: string;
	}) {
		let correct: boolean;

		const valid = {
			lowercaseAlpha: false,
			uppercaseAlpha: false,
			numbers: false,
			whitespace: false,
			symbols: false,
			custom: '',
			...strConsistOf,
		};
		const validates: {
			[name: string]: string;
		} = {};
		if (valid.lowercaseAlpha) validates.lowercaseAlpha = 'a-z';
		if (valid.uppercaseAlpha) validates.uppercase = 'A-Z';
		if (valid.numbers) validates.numbers = '0-9';
		if (valid.whitespace) validates.whitespace = ' \\t';
		if (valid.symbols)
			validates.symbols = '!@#$%^&*()_+-=~`\';:.,<>/?[\\]"\\\\|{}';
		if (valid.custom) validates.custom = valid.custom;

		correct = new RegExp(`^[${Object.values(validates).join('')}]+$`).test(
			this.value
		);

		this.correct = this.#verifyCorrect(correct);
		this.details.consistOf = correct;

		return this;
	}

	/**
	 * @returns Array Form of `details` obj
	 * - [ 0 ] : Properties Array
	 * - [ 1 ] : Properties Value Array
	 */
	array() {
		return [Object.keys(this.details), Object.values(this.details)];
	}

	/**
	 *  Calculates Age
	 * format : YY-MM-DD
	 * @returns {number} age
	 * - Not a chainable Property
	 * @example
	 * new Verifier('2005-02-22').ageCalc() => 17 (As of 27 March 2022)
	 * new Verifier('2000-02-22').ageCalc() => 22 (As of 27 March 2022)
	 */
	//**  Date Format : YY-MM -DD
	ageCalc(): number {
		const date = this.value;
		if (!/\d{4}-\d{1,2}-\d{1,2}/.test(date)) {
			throw Error('Verifier.ageCalc:Invalid Date');
		}
		const dob = new Date(date);
		//* Get Month diff from current time
		const monthDiff = Date.now() - dob.getTime();
		//* Converting it into Date format
		const ageDiff = new Date(monthDiff);
		//* Calculating age
		return Math.abs(ageDiff.getUTCFullYear() - 1970);
	}

	#verifyCorrect(correct: boolean | errorsObj): boolean {
		if (typeof correct === 'boolean') {
			return Object.values({ ...this.details, correct }).every((v) => v);
		} else {
			return Object.values({ ...this.details, ...correct }).every((v) => v);
		}
	}
}
