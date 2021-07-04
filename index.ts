interface errorsObj {
  [errName: string]: boolean;
}
/**
 *
 * @param lengthRequired
 * @returns upperlimit and lowerlimit
 */
const lengthRegex = (lengthRequired: number | string) => {
  let upperlimit = "",
    lowerlimit = "0";
  if (typeof lengthRequired === "string") {
    lengthRequired.split(" ").map((len) => {
      if (len.includes("gt")) {
        lowerlimit = (len.match(/[0-9]{1,}/) as string[])[0];
      }
      if (len.includes("lt")) {
        upperlimit = (len.match(/[0-9]{1,}/) as string[])[0];
      }
    });
  }
  return { upperlimit, lowerlimit };
};

/**
 *
 * @param  {object} customRegexObj : custom regex object {[errName] :regex,...}
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
    [property: string]: boolean;
  };
  /** All the method used on the chain */
  functionUsed: {
    [Function: string]: { [param: string]: string | Object };
  }[];
  constructor(_value: string) {
    this.value = _value;
    this.correct = false;
    this.details = {};
    this.functionUsed = [];
  }

  /**
   * Check if Email is valid.
   *
   * - Addes email property in `details` obj
   * - Also affects `correct`
   * - Also can be chained behind or before any other chaineble verification methods
   * @example
   * 'example@domain.co.org' => true
   * 'wrongEmail@.co' => false
   */
  isEmail() {
    if (/\w{1,}@\w{1,}\.(\w{1,})+/.test(this.value)) {
      this.correct = true;
      this.details.email = true;
    } else {
      this.correct = false;
      this.details.email = false;
    }
    this.functionUsed.push({
      isEmail: {},
    });
    return this;
  }
  /**
   *
   * @param {number} length : length string
   * - Addes `length` property in `details` obj
   * - Also affects `correct`
   * - Also can be chained behind or before any other chaineble verification methods
   * @example
   * ('lowerthan 15','lt15') =>  true
   * ('greaterthan10','gt10') => true
   * ('merged',"gt2 lt7") => true
   * ('exact',5) => true
   * ("wrong","gt7 lt10") =>  false;
   * ("short",7) => false
   */
  //* Checks Length of value is greater or equal to given required length
  isLengthen(length: number | string) {
    const { upperlimit, lowerlimit } = lengthRegex(length);
    let correct = true;
    if (typeof length === "number") {
      correct = length === this.value.length;
      this.details.length = correct;
      this.correct = correct;
      return this;
    }
    if (lowerlimit && upperlimit) {
      correct =
        Number(lowerlimit) < this.value.length &&
        this.value.length < Number(upperlimit);
    } else correct = Number(lowerlimit) < this.value.length;

    this.correct = correct;
    this.details.length = correct;
    this.functionUsed.push({
      isLengthen: {
        length,
      },
    });
    return this;
  }

  /**  Checkes Username
   * - Default Username syntax:
   *    1. Username should only start with a-z,A-Z
   *    2. Username should only contain letters, numbers, _s , -saturation ,.saturation
   * - Addes `length`&`start` properties in `details` obj
   * - Also affects `correct`
   * - Also can be chained behind or before any other chaineble verification methods
   * - to update length just add isLengthen function behind this function. or custom regex
   * @param {object} customRegexObj `optional` {[errName]:regex,...}
   *  @example
   * ('username') => true
   * ('$wrongUsername') => false
   * ('wrong$Username') => false
   * ('3wrongUsername') => true
   * ('username',{ length:/.{4,}/,start:/^[a-zA-Z]{1,}/} ) => true
   */
  //* Checks if value is a valid username and if not returns object with errors
  isUsername(customRegexObj?: object) {
    let errors: errorsObj = {
      start: false,
      syntax: false,
    };
    if (customRegexObj) {
      errors = checkCustomRegex(customRegexObj, this.value);
      this.correct = Object.values(errors).every((v) => v);
      this.details = {
        ...this.details,
        ...errors,
      };
      this.functionUsed.push({
        isUsername: {
          customRegexObj,
        },
      });
      return this;
    }
    if (/^[a-zA-Z]{1,}/.test(this.value)) errors.start = true;
    if (!/[`!@#$%^&*()+\=[\]{};':'\\|,<>/?~]/.test(this.value))
      errors.syntax = true;
    this.correct = Object.values(errors).every((v) => v);
    this.details = {
      ...this.details,
      ...errors,
    };
    this.functionUsed.push({
      isUsername: {},
    });
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
   * - Addes `length`,`lowercase`,`uppercase`,`symbol` properties in `details` obj
   * - Also affects `correct`
   * - Also can be chained behind or before any other chaineble verification methods
   * - to update length just add isLengthen function behind this function. or custom regex
   * @param customRegexObj `optional` {[errName]:regex,...}
   *  @example
   *  ('hello') => false
   *  ('secreT@123') => true
   *  ('secreT',{length:/\w{1,}/}) => true
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
      this.correct = Object.values(errors).every((v) => v);
      this.details = errors;
      this.functionUsed.push({
        isPassword: {
          customRegexObj,
        },
      });
      return this;
    }
    //- Checks if password contains a lowercase character, if it contains then setting lowercase in errors false
    errors.lowercase = /[a-z]/.test(this.value);
    //- Checks if password contains a uppercase character, if it contains then setting uppercase in errors false
    errors.uppercase = /[A-Z]/.test(this.value);
    //- Checks if password contains a symbol or a number, if it contains then setting symbol in errors false
    errors.symbol = /[@#$%^&*!_+\-|\\/0-9]/.test(this.value);
    //- Checks if length of password is 8 or greater, if it is then setting length in errors false
    errors.length = this.isLengthen("gt8").correct;
    this.correct = Object.values(errors).every((v) => v);
    this.details = errors;
    this.functionUsed.push({
      isPassword: {},
    });
    return this;
  }
  includes(str:string){
    
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
   * ('2005-02-22') => 16
   * ('2000-02-22') => 21
   */
  //**  Date Format : YY-MM -DD
  ageCalc(): number {
    const date = this.value;
    if (!/\d{4}-\d{1,2}-\d{1,2}/.test(date)) {
      throw Error("Verifier.ageCalc:Invalid Date");
    }
    const dob = new Date(date);
    //* Get Month diff from current time
    const monthDiff = Date.now() - dob.getTime();
    //* Converting it into Date format
    const ageDiff = new Date(monthDiff);
    //* Calculating age
    const age = Math.abs(ageDiff.getUTCFullYear() - 1970);
    return age;
  }

}
