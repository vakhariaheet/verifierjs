interface errorsObj {
    [errName: string]: boolean;
}
/**
 *
 * @param lengthRequired
 * @returns upperlimit and lowerlimit
 */
declare const lengthRegex: (lengthRequired: number | string) => {
    upperlimit: string;
    lowerlimit: string;
};
/**
 *
 * @param  {object} customRegexObj : custom regex object {[errName] :regex,...}
 * @returns {object} {[errName]:regex test result};
 */
declare const checkCustomRegex: (customRegexObj: any, value: string) => errorsObj;
/**
 * @param {string} value Default string for functions
 * #### Note
 * - Default String Changes for the function after the function in which string is specified.
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
 *
 */
declare class Verifier {
    value: string;
    correct: boolean;
    details: {
        [property: string]: boolean;
    };
    functionUsed: {
        [Function: string]: {
            [param: string]: string | Object;
        };
    }[];
    constructor(_value: string);
    /**
     * Check if Email is valid.
     *
     * @param {string} _value `optional`:email to check. default will be the string provider while creating new verifier or the string provider in function before this in the function chain
     * - Addes email property in `details` obj
     * - Also affects `correct`
     * - Also can be chained behind or before any other chaineble verification methods
     * @example
     * 'example@domain.co.org' => true
     * 'wrongEmail@.co' => false
     */
    isEmail(_value?: string): this;
    /**
     *
     * @param {string} value :`optional` string to verify. default will be the string provider while creating new verifier or the string provider in function before this in the function chain
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
    isLengthen(length: number | string, _value?: string): this;
    /**  Checkes Username
     * - Default Username syntax:
     *    1. Username should only start with a-z,A-Z
     *    2. Username should only contain letters, numbers, _s , -saturation ,.saturation
     * - Addes `length`&`start` properties in `details` obj
     * - Also affects `correct`
     * - Also can be chained behind or before any other chaineble verification methods
     * - to update length just add isLengthen function behind this function. or custom regex
     * @param {object} customRegexObj `optional` {[errName]:regex,...}
     * @param {string} value `optional` string to verify
     *  @example
     * ('username') => true
     * ('$wrongUsername') => false
     * ('wrong$Username') => false
     * ('3wrongUsername') => true
     * ('username',{ length:/.{4,}/,start:/^[a-zA-Z]{1,}/} ) => true
     */
    isUsername(customRegexObj?: object, _value?: string): this;
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
     * @param value `optional` string to verify
     *  @example
     *  ('hello') => false
     *  ('secreT@123') => true
     *  ('secreT',{length:/\w{1,}/}) => true
     */
    isPassword(customRegexObj?: errorsObj, _value?: string): this;
    /**
     * @returns Array Form of `details` obj
     * - [ 0 ] : Properties Array
     * - [ 1 ] : Properties Value Array
     */
    array(): (string[] | boolean[])[];
    /**
     * @param {boolean} inNumber: If Output should be a number
     * @returns `correct` variable
     */
    isCorrect(inNumber: boolean): number | boolean;
    /**
     *  Calculates Age
     * @param date DOB(format : YY-MM-DD)
     * @returns {number} age
     * - Not a chainable Property
     * @example
     * ('2005-02-22') => 16
     * ('2000-02-22') => 21
     */
    ageCalc(date?: string): number;
}
