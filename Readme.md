# Verifier

A tiny js library for Form validation.

## Installation

```bash
npm install verifierjs --save
```

```bash
yarn add verifierjs
```

## Import

```javascript
import verifier from "verifierjs";
```

```JavaScript
// CommonJS
const verifier = require('verifierjs');
```

##### Note
Color conversion functions are transfered to [color-converter](https://www.npmjs.com/package/color-convertor)


### Usage

```JavaScript
// isUsername
verifier.isUsername('username')// returns true
verifier.isUsername('username',/\w{1,}/)// returns true

// isPassword
verifier.isPassword('secret') // returns false
verifier.isPassword('secreT@123') // returns true
verifier.isPassword('secret',/.{1,}/) // returns true

// isUsernameRT
verifier.isUsernameRT('username') // returns { start: false, syntax: false}
verifier.isUsernameRT('username',{length:/\w{3,}/}) // returns {length : false}

// isPasswordRT
verifier.isPasswordRT('secret') // returns {length :true,lowercase:false,uppercase :true,symbol: true};
verifier.isPasswordRT('secret',{length:/\w{3,}/}) //returns {length:false}

// isEmail
verifier.isEmail('wrongEmail@.com') // returns false
verifier.isEmail('example@example.com.in') // returns true

// isLengthen
verifier.isLengthen('exact',5) // returns true
verifier.isLengthen('greaterthan','gt10') // returns true
verifier.isLengthen('lowerthan','lt10') // returns true
// ageCalc
verifier.ageCalc('2005-02-22') //  16
verifier.ageCalc('2000-02-22') //  21

// isAgeValid
verifier.isAgeValid('2005-02-22') // returns false
verifier.isAgeValid('2000-02-22') // returns true
verifier.isAgeValid('2005-02-22',14) // returns true

// custom 
verifier.custom("hello", {
      length: 5,
      start: "he",
      end: "wrong",
      includes: verifier.includes("heslaja"),
      excludes: "wholeHello",
    }) // returns {
      //          length: false,
      //          includes: false,
      //          excludes: false,
      //          start: false,
      //          end: true,
      //         }
verifier.custom(
     "hello@gacom",
     {
       length: "gt2",
       local: {
         vstr: verifier.includes("a-zA-Z0-9"),
         length: "gt1 lt7",
       },
       domain: verifier.includes("a-zA-Z"),
       address: {
         vstr: verifier.includes("a-zA-Z0"),
         length: "lt10",
         continues: true,
       },
     },
     "{local}@{domain}.{address}"
   )  // returns {
      //  length: false,
      //  vstr: false,
      // }

```

Username Default syntax

- Username must start with alphabetic characters
- Username should only contain letters, numbers,underscores,dashes,dots

Password Default syntax

- must contain at least one lowercase letter
- must contain at least one uppercase letter
- must contain at least one symbol or number
- length must be at least 8 characters long

Age

- Default valid Age: 18
- DOB Format : YY-MM-DD

UsernameRT & PasswordRT customRegexObj (optional)

```JavaScript
{
    [errName]: RegExp,
    ...
}
```
Custom Function
Props
- value : String To Verify
- options:(All are Optional)
- length :
  - number : to check if value is exactly equal to the given number
  - string:'lt[Number] gt[Number]' lt : lower than gt :greater than 
  - Boolean : to check if the value is greater than 8 
  - Regex : to check custom Regex

- start:
  - string : to check if value is starting with the given string
  - includes(str): If value should start with one of characters of the str( specified in includes Function)
  - Regex : to check custom Regex
- end:
  - string : to check if value is ending with the given string
  - includes(str): If value should end with one of characters of the str specified in includes Function
  - Regex : to check custom Regex
- includes
  - string: to check if the value is containing the given string
  - includes(str): If value should contains one or more of characters of the str specified in includes Function
  - Regex : to check custom Regex
- excludes
  - string: to verify that the value does not contain the given string
  - includes(str): If value shouldn't contains one or more of characters of the str specified in includes Function
  - Regex : to check custom Regex
- [varible name specified in rstr]: 
  - string:The string will replace the variable in the final regex
  - Regex: to check custom Regex
  - object:
    - vstr(required):
      string:The string will replace the variable in the final regex
    - includes(str): If value shouldn't contains one or more of characters of the str specified in includes Function
    - continues(optional): 
    - Boolean:The vstr condition should occur at least once 
    - length(optional):
      - Number: Should be exactly equal to the given number
      - String: 'lt[Number] gt[Number]' lt : lower than gt :greater than

rstr:
- Format 
  - To add variable write variable name between pair of curly brackets (ie {})
  - Add a simple string in the rstr.
  #### Example 
    ```javascript
    {local}@{domain}.{address}
    ```

- Functions
  1. isUsername
  2. isUsernameRT
  3. isPassword
  4. isPasswordRT
  5. isEmail
  6. isLengthen
  7. ageCalc
  8. isAgeValid
  9. custom
