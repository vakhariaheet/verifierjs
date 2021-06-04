/**
 *
 * @param  {object} customRegexObj : custom regex object {[errName] :regex,...}
 * @returns {object} {[errName]:regex test result};
 */
const checkCustomRegex = (customRegexObj: any, value: string): object => {
  const errNames = Object.keys(customRegexObj);
  const errors: any = {};
  errNames.map(
    (errName) => (errors[errName] = !customRegexObj[errName].test(value))
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

const lengthRegex = (lengthRequired: number | string) => {
  let upperlimit = "",
    lowerlimit = "0";
  if (typeof lengthRequired === "string") {
    lengthRequired.split(" ").map((len) => {
      if (len.includes("gt"))
        lowerlimit = (len.match(/[0-9]{1,}/) as string[])[0];
      else if (len.includes("lt"))
        upperlimit = (len.match(/[0-9]{1,}/) as string[])[0];
    });
  }
  return { upperlimit, lowerlimit };
};
/**
 *
 * @param {string} value : string to verify
 * @param {number} lengthRequired : maximum length of string should be
 * @returns Boolean
 * @example
 * ('lowerthan 15','lt15') =>  true
 * ('greaterthan10','gt10') => true
 * ('merged',"gt2 lt7") => true
 * ('exact',5) => true
 * ("wrong","gt7 lt10") =>  false;
 * ("short",7) => false
 */
//* Checks Length of value is greater or equal to given required length
export const isLengthen = (
  value: string,
  lengthRequired: number | string
): boolean => {
  const { upperlimit, lowerlimit } = lengthRegex(lengthRequired);
  if (typeof lengthRequired === "number") {
    return lengthRequired === value.length;
  }

  if (lowerlimit && upperlimit) {
    return (
      Number(lowerlimit) < value.length && value.length < Number(upperlimit)
    );
  } else if (lowerlimit) return Number(lowerlimit) < value.length;
  else {
    return Number(upperlimit) > value.length;
  }
};

/**  Checkes Username
 * - Default Username syntax:
 *    1. Username should only start with a-z,A-Z
 *    2. Username should only contain letters, numbers, _s , -saturation ,.saturation
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
  if (/^[a-zA-Z]{1,}/.test(value)) errors.start = false;
  if (!/[`!@#$%^&*()+\=[\]{};':'\\|,<>/?~]/.test(value)) errors.syntax = false;
  return errors;
};

/**
 * Check Username
 * - Default Username syntax:
 *    1. Username should only start with a-z,A-Z
 *    2. Username should only contain letters, numbers, _s , -saturation ,.saturation
 * @param value string to verify
 * @returns Boolean | if value is a valid username
 *
 * @example
 * ('hello') => true
 * ('hello23') => true
 * ('hello$') => false
 * ('2hello') => false
 * ('2hello',/\w{1,}/) => true
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
 *    1. must contain at least one lowercase letter
 *    2. must contain at least one uppercase letter
 *    3. must contain at least one symbol or number
 *    4. length must be at least 8 characters long
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
 *  ('hello') => {
 *                length :true,
 *                lowercase:false,
 *                uppercase :true,
 *                symbol: true,
 *               }
 * ('secreT@123') => {
 *                    length :false,
 *                    lowercase:false,
 *                    uppercase :false,
 *                    symbol: false,
 *                   }
 * ('secreT',{length:/\w{1,}/}) => {
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
  if (isLengthen(value, "gt8")) errors.length = false;

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
 * @param requiredAge  expected minimum age (default 18)(optional)

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
/**
 * includes for custom fucntion
 * - It is case sensitive
 * @param {string} str
 * @example
 *  includes("a-z") => Means any lowercase letter from a to z is valid
 *  includes("hello") => Mean any letter from word hello is valid
 *  includes("A-Za-z") => Means any lowercase or uppercase Alphabet is valid
 *
 */
export const includes = (str: string): { regex: string } => {
  return { regex: `[${reservedChar(str)}]` };
};
/**
 * Convert regex reserved charaters into normal characters
 * @param str string
 * @returns string
 * @example
 *  '\w' =>'\\w'
 *  '.' => '\.'
 */
const reservedChar = (str: string): string => {
  const reservedChars = [
    "\\",
    ".",
    "*",
    "{",
    "[",
    "^",
    "$",
    "(",
    "+",
    ")",
    "|",
    "?",
    "<",
    ">",
    "}",
    "]",
  ];

  reservedChars.map((reservedChar) => {
    const replaced = `\\` + reservedChar;
    return (str = str.replace(reservedChar, replaced));
  });

  return str;
};
/**
 *
 * @param value string to verify
 * @param options custom options
 * @param rstr custom rstr (optional)
 * @returns errors object
 *@description options
 * - all the properties are optional only errors defined in rstr are compalsary
 * - {
 *  -- length:number | string | RegExp |boolean
 *  --  start?: string | RegExp | includes Function
 *  -- end?: string | RegExp | includes Function;
 *  -- includes?: string | RegExp |includes Function;
 *  -- excludes?: string | RegExp | includes Function
 *  -- [variable Name] : string | includes Function | { vstr: string| includes Function,continues:Boolean(optional),length:number|string(optional)}
 * - }
 * @example
 * ("hello",{
 *  length :5,
 *  start: "he",
 *  end:'wrong',
 *  includes: includes("heslaja"),
 *  excludes: "wholeHello",
 * }) => { length: false,
 *         includes: false,
 *         excludes: false,
 *         start: false,
 *         end: true
 *       }
 * (
 *    "hello@gacom",
 *    {
 *      length: "gt2",
 *      local: {
 *        vstr: includes("a-zA-Z0-9"),
 *        length: "gt1 lt7",
 *      },
 *      domain: includes("a-zA-Z"),
 *      address: {
 *        vstr: includes("a-zA-Z0"),
 *        length: "lt10",
 *        continues: true,
 *      },
 *    },
 *    "{local}@{domain}.{address}"
 *  ) => {
 *  length: false,
 *  vstr: false,
 * }
 */
export const custom = (
  value: string,
  options: {
    [errName: string]:
      | undefined
      | number
      | string
      | RegExp
      | boolean
      | { regex: string }
      | {
          vstr: string | { regex: string };
          continues?: Boolean;
          length?: number | string;
        };
    length?: number | string | RegExp | boolean;
    start?: string | RegExp | { regex: string };
    end?: string | RegExp | { regex: string };
    includes?: string | RegExp | { regex: string };
    excludes?: string | RegExp | { regex: string };
  },
  rstr?: string
) => {
  //* All errors
  const errors: {
    [errName: string]: boolean;
  } = {};
  //* predefined errors
  const predefined = ["length", "start", "end", "includes", "excludes"];
  //* Length Err
  switch (typeof options.length) {
    case "string":
      errors.length = !isLengthen(value, options.length);
      break;
    case "number":
      errors.length = !isLengthen(value, options.length);
      break;
    case "boolean":
      errors.length = !isLengthen(value, "gt8");
    case "object":
      if (options.length instanceof RegExp) {
        errors.length = !(options.length as RegExp).test(value);
      }
      break;
  }
  //* Includes
  switch (typeof options.includes) {
    case "string":
      errors.includes = !new RegExp(options.includes).test(value);
      break;
    case "object":
      if (options.includes instanceof RegExp) {
        errors.excludes = (options.length as RegExp).test(value);
        break;
      } else if (options.includes.regex) {
        errors.includes = !new RegExp(options.includes.regex).test(value);
        break;
      }

      break;
  }
  //* Includes
  switch (typeof options.excludes) {
    case "string":
      errors.excludes = new RegExp(`${options.excludes}`).test(value);
      break;
    case "object":
      if (options.excludes instanceof RegExp) {
        errors.excludes = !(options.excludes as RegExp).test(value);
        break;
      }
      if (options.excludes.regex) {
        errors.excludes = new RegExp(`${options.excludes.regex}`).test(value);
      }
      break;
  }
  //* Start
  switch (typeof options.start) {
    case "string":
      errors.start = !new RegExp(`^${options.start}`).test(value);
      break;
    case "object":
      if (options.start instanceof RegExp) {
        errors.start = !options.start.test(value);
        break;
      } else if (options.start.regex) {
        errors.start = !new RegExp(`^${options.start.regex}`).test(value);
        break;
      }
      break;
  }
  //*End
  switch (typeof options.end) {
    case "string":
      errors.end = !new RegExp(`${options.end}$`).test(value);
      break;
    case "object":
      if (options.end instanceof RegExp) {
        errors.end = !options.end.test(value);
        break;
      }
      if (options.end.regex) {
        errors.end = !new RegExp(`${options.end.regex}$`).test(value);
        break;
      }
  }

  const rStrVariables: {
    [errName: string]: { regex: string; group: string };
  } = {};
  if (rstr) {
    Object.keys(options).map((err) => {
      if (!options[err]) return;
      const value = options[err];
      //* Switch For Custom Variable Type
      //** Storing all Custom Variables in rStrVariables Format
      switch (typeof value) {
        case "string":
          if (predefined.indexOf(err) !== -1) break;

          rStrVariables[err] = {
            regex: `(${reservedChar(value)})`,
            group: err,
          };
          return;
        case "object":
          //- If Custom Variable is Regex Expression
          if (value instanceof RegExp) {
            let regex: string | string[] = value.toString().split("");
            regex.splice(0, 1);
            regex.splice(-1, 1);
            rStrVariables[err] = {
              regex: `(${regex.join("")})`,
              group: "group",
            };
            return;
          }
          //- If Custom Variable is in includes Function
          if ("regex" in value) {
            return (rStrVariables[err] = {
              regex: `(${value.regex}{1,})`,
              group: err,
            });
          }
          //- If Custom Variable is in expanded Format
          if ("vstr" in value) {
            let length = value.length
              ? typeof value.length === "string"
                ? `{${lengthRegex(value.length).lowerlimit},${
                    lengthRegex(value.length).upperlimit
                  }}`
                : typeof value.length === "number"
                ? `{${value.length}}`
                : ""
              : "";

            if ("continues" in value && value.continues) {
              return (rStrVariables[err] = {
                regex: `(${
                  typeof value.vstr === "string"
                    ? reservedChar(value.vstr)
                    : value.vstr.regex
                }${length})+`,
                group: err,
              });
            } else {
              return (rStrVariables[err] = {
                regex: `(${
                  typeof value.vstr === "string"
                    ? reservedChar(value.vstr)
                    : value.vstr.regex
                }${length})`,
                group: err,
              });
            }
          }

          break;
      }
    });
    //* Finding ranges of custom variableNames in rstr string
    const ranges: Array<Array<number>> = [];
    rstr.split("").map((char, index) => {
      if (char !== "{" && char !== "}") return;
      if (char === "{") {
        ranges[ranges.length] = [index];
      }
      if (char === "}") {
        ranges[ranges.length - 1].push(index);
      }
    });
    //-- Separating Varibles and String from rstr string
    //* Finding Name of variables from rstr string
    const variableNames = ranges.map((range) => {
      let variable = "";
      for (let i = range[0] + 1; i < range[1]; i++) {
        variable += rstr[i];
      }

      return variable;
    });
    //* Finding normal string from rstr string
    const strings = ranges.map((range, index, array) => {
      let string = "";
      if (array.length - 1 !== index) {
        for (let i = range[1] + 1; i < array[index + 1][0]; i++) {
          string += rstr[i];
        }
      } else {
        for (let i = range[1] + 1; i < rstr.length; i++) {
          string += rstr[i];
        }
      }
      return string;
    });

    let index = 0;
    let count = 0;
    let regexsStr: { [errName: string]: string } = {};
    let currentGroup = "";
    //--  For  Future Update
    //* finding Values for Varibles present in rstr and Storing in regexStr
    ranges.map(() => {
      const variable = rStrVariables[variableNames[index]];

      if (Object.keys(regexsStr).length === 0) {
        currentGroup = variable.group;
        index++;

        regexsStr[currentGroup] = `${variable.regex}${strings[count]}`;
        return count++;
      }
      if (variable.group === currentGroup) {
        regexsStr[currentGroup] = `${regexsStr[currentGroup]}${
          rStrVariables[variableNames[index]].regex
        }`;
        index++;
      } else {
        index++;
        regexsStr[variable.group] = `${regexsStr[variable.group] || ""}${
          variable.regex
        }`;
        currentGroup = variable.group;
      }

      regexsStr[currentGroup] = `${regexsStr[currentGroup]}${reservedChar(
        strings[count]
      )}`;
      count++;
    });
    let regex = "";
    //* Creating Final Regex
    Object.keys(regexsStr).map((err) => {
      regex += regexsStr[err];
    });
    errors.vstr = !new RegExp(regex).test(value);
  }

  //* Returning Final Errors
  return errors;
};
