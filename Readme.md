# Verifier

A js library for utils functions

- includes Functions for Form Validation
- Conversion Functions

## Installation

```bash
npm install verifierjs --save
```

```bash
yarn add verifierjs
```

## Import

```javascript
// Imports All Functions
import verifier from "verifierjs";
// Import only Form Functions
import verifier from "verifierjs/Form";
//Import only Color Conversion Functions
import verifier from "verifierjs/Color";
```

```JavaScript
// CommonJS
// Import All Functions
const verifier = require('verifierjs');
// Import only Form Functions
const verifier = require('verifierjs/Form');
//Import only Color Conversion Functions
const verifier = require('verifierjs/Color');
```

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
      includes: includes("heslaja"),
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
         vstr: includes("a-zA-Z0-9"),
         length: "gt1 lt7",
       },
       domain: includes("a-zA-Z"),
       address: {
         vstr: includes("a-zA-Z0"),
         length: "lt10",
         continues: true,
       },
     },
     "{local}@{domain}.{address}"
   )  // returns {
      //  length: false,
      //  vstr: false,
      // }
// MoreInfo Bottom

// HEX to RGB/RGBA
verifier.hexToRgb('#2d2d2d') // returns rgb(45,45,45);
verifier.hexToRgb('#2d2d2dcc') // returns rgba(45,45,45,.8);

// HEX to HSL/HSLA
verifier.hexToHsl('#fff') // returns hsl(0,0%,100%)

//RGBA/RGB to HEX
verifier.rgbToHex(255,255,255,.8)// returns #ffffffcc
verifier.rgbToHex(255,255,255)// returns #ffffff

//RGBA/RGB String to HEX
verifier.rgbStrToHex('rgba(255,255,255,.8)')// returns #ffffffcc
verifier.rgbStrToHex('rgb(255,255,255)')// returns #ffffff

// RGB/RGBA to HSL/HSLA
verifier.rgbToHsl(33,33,33) // returns 'hsl(0,0%,13%)'
verifier.rgbToHsl(0,0,0,.5) // returns 'hsla(0,0%,0%,0.5)'

// RGB/RGBA String to HSL/HSLA
verifier.rgbStrToHsl('rgb(33,33,33)') // 'hsl(0,0%,13%)'
verifier.rgbStrToHsl('rgba(0,0,0,.5)') // returns 'hsla(0,0%,0%,0.5)'

// HSL/HSLA to RGB/RGBA
verifier.hslToRgb(500, 0.5, 0.5) // returnsrgb(64,191,106)
verifier.hslToRgb(500, '50%', '50%') // returnsrgb(64,191,106)
verifier.hslToRgb(500, 0.5, 0.5,.5) // returns rgb(64,191,106,.5)

// HSL/HSLA String to RGB/RGBA
verifier.hslStrToRgb('hsl(500, 50%, 50%)') // returns rgb(64,191,106)
verifier.hslStrToRgb('hsla(500, 0.5, 0.5,.5)') // returns rgba(64,191,106,.5)

// HSL/HSLA to HEX
verifier.hslToHex(50,'50%','50%') // returns #bfaa40
verifier.hslToHex(150,.5,.5) // returns #40bf80

// HSL/HSLA String to HEX
verifier.hslStrToHex('hsl(50,50%,50%)') // returns #bfaa40
verifier.hslToHex('hsla(150,.5,.5,.8)') // returns #40bf80cc

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
    {local}@{domain}\.{address}
    ```

- Form Functions
  1. isUsername
  2. isUsernameRT
  3. isPassword
  4. isPasswordRT
  5. isEmail
  6. isLengthen
  7. ageCalc
  8. isAgeValid
  9. custom
- Color Conversion Functions
  1. hexToRgb
  2. hexToHsl
  3. rgbToHex
  4. rgbStrToHex
  5. rgbToHsl
  6. rgbStrToHsl
  7. hslToHex
  8. hslStrToHex
  9. hslToRgb
  10. hslStrToRgb
