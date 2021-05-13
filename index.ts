/**
 *
 * @param  {object} customRegexObj : custom regex object {[errName] :regex,...}
 * @returns {object} {[errName]:regex test result};
 */
const checkCustomRegex = (customRegexObj: any, value: string): object => {
  const errNames = Object.keys(customRegexObj);
  const errors: any = {};
  errNames.map(
    (errName) => (errors[errName] = customRegexObj[errName].test(value))
  );
  return errors;
};
//* Checks Email syntax
/**
 *
 * @param {string} email : email to check
 * @returns {boolean} Boolean: If email is valid
 * @example
 * 'example@domain.com' => true
 * 'wrongEmail@.co' => false
 */
export const isEmail = (email: string): boolean => {
  if (/\w{1,}@\w{1,}\.(\w{1,})+/.test(email)) return true;
  return false;
};
/**
 *
 * @param {string} value : string to verify
 * @param {number} lengthRequired : maximum length of string should be
 * @returns Boolean
 * @example
 * ('short',6) => false
 * ('valid',3) => true
 */
//* Checks Length of value is greater or equal to given required length
export const isLengthen = (value: string, lengthRequired: number): boolean => {
  const regex = new RegExp(`.{${lengthRequired},}`);
  if (regex.test(value)) return true;
  return false;
};
/**  Checkes Username
 * - Default Username syntax:
 *    1. Username should only start with a-z,A-Z
 *    2. Username should only contain letters, numbers, _s , -s ,.s
 *
 * @param {string} value  string to verify
 * @param {object} customRegexObj {[errName]:regex,...}
 * @returns {object} {
 * start :Boolean,
 * syntax:Boolean
 * } OR {[errName]:if err True,...} (Given In Custom Regex);
 *  @example
 * ('username') => { start:false ,syntax :false}
 * ('$wrongUsername') => {start:true,syntax:true}
 * ('wrong$Username') => {start:false,syntax: true}
 * ('3wrongUsername') => {start:true,syntax:false}
 * ('username',{ length:/.{4,}/,start:/^[a-zA-Z]{1,}/} ) => {length:false,start:false}
 */
//* Checks if value is a valid username and if not returns object with errors
export const isUsernameRT = (value: string, customRegexObj?: {}) => {
  const errors = {
    start: true,
    syntax: true,
  };
  if (customRegexObj) return checkCustomRegex(customRegexObj, value);
  if (/^[a-zA-Z]{1,}/) errors.start = false;
  if (!/[`!@#$%^&*()+\=[\]{};':"\\|,<>/?~]/.test(value)) errors.syntax = false;
  return errors;
};

/**
 * Check Username
 * - Default Username syntax:
 *    1. Username should only start with a-z,A-Z
 *    2. Username should only contain letters, numbers, _s , -s ,.s
 * @param value string to verify
 * @returns Boolean | if value is a valid username
 *
 * @example
 * ("hello") => true
 * ("hello23") => true
 * ("hello$") => false
 * ("2hello") => false
 * ("2hello",/\w{1,}/) => true
 *
 */
//* Checks if value is a valid username and return boolean
export const isUsername = (value: string, customRegex?: RegExp): boolean => {
  if (customRegex) return customRegex.test(value);
  return Object.values(isUsernameRT(value)).every((key) => !key);
};
/**
 * Checks Password syntax
 *  - Default Password syntax
 *    1. must contain aleast one lowercase letter
 *    2. must contain aleast one uppercase letter
 *    3. must contain aleast one symbol or number
 *    4. length must be aleast 8 characters long
 * - Default Password syntax can be changed by passing customRegexObj as param
 * @param value string to verify
 * @param customRegexObj {[errName]:regex,...}
 * @returns {object}
 * - If custom regex not specified
 *   * {
 *  length :Boolean,
 *  lowercase:Boolean,
 *  uppercase :Boolean,
 * symbol: Boolean,
 * }
 * * If CustomRegex specified
 *    * {[errName]:Boolean,...}
 *  @example
 *  ("hello") => {
 *                length :true,
 *                lowercase:false,
 *                uppercase :true,
 *                symbol: true,
 *               }
 * ("secreT@123") => {
 *                    length :false,
 *                    lowercase:false,
 *                    uppercase :false,
 *                    symbol: false,
 *                   }
 * ("secreT",{length:/\w{1,}/}) => {
 *                                  length: false
 *                                 }
 */
//* Checks if value is a valid password and returns errors object
export const isPasswordRT = (value: string, customRegexObj?: {}) => {
  if (customRegexObj) return checkCustomRegex(customRegexObj, value);
  const errors = {
    length: true,
    lowercase: true,
    uppercase: true,
    symbol: true,
  };

  //- Checks if password contains a lowercase character, if it contains then setting lowercase in errors false
  if (/[a-z]/.test(value)) errors.lowercase = false;

  //- Checks if password contains a uppercase character, if it contains then setting uppercase in errors false
  if (/[A-Z]/.test(value)) errors.uppercase = false;

  //- Checks if password contains a symbol or a number, if it contains then setting symbol in errors false
  if (/[@#$%^&*!_+\-|\\/0-9]/.test(value)) errors.symbol = false;

  //- Checks if length of password is 8 or greater, if it is then setting length in errors false
  if (isLengthen(value, 8)) errors.length = false;

  return errors;
};
/**
 * Checks password syntax
 * @param value password to validate
 * @returns {Boolean} Boolean | if password is in valid syntax
 * @example
 * ('secret') => false
 * ('secreT@123') => true
 * ('verysecret',/\w{8,}/) => true
 */
//* Checks if value is a valid password and returns a boolean
export const isPassword = (value: string, customRegex?: RegExp): boolean => {
  if (customRegex) return customRegex.test(value);
  else if (Object.values(isPasswordRT(value)).every((v) => !v)) return true;
  return false;
};

/**
 *  Calculates Age
 * @param date DOB(format : YY-MM-DD)
 * @returns {number} age
 * @example
 * ('2005-02-22') => 16
 * ('2000-02-22') => 21
 */
//**  Date Format : YY-MM -DD
export const ageCalc = (date: string): number => {
  const dob = new Date(date);
  //* Get Month diff from current time
  const monthDiff = Date.now() - dob.getTime();
  //* Converting it into Date format
  const ageDiff = new Date(monthDiff);
  //* Calculating age
  const age = Math.abs(ageDiff.getUTCFullYear() - 1970);
  return age;
};
/**
 * Calculates age and returns if age is valid for required age
 * @param dob user dob(format YY-MM-DD)
 * @param  requiredAge  mininum age (default 18)(optional)

 * @returns Boolean | if age is valid
 * @example
 *  ('2005-02-22') => false
 *  ('2005-02-22',14) =>  true
 *
 */
//* Checks Age Is Valid with given age
export const isAgeValid = (dob: string, requiredAge: number = 18): boolean => {
  const age = ageCalc(dob);
  if (age >= requiredAge) return true;
  return false;
};
