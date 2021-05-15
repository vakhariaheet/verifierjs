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
verifier.isLengthen('correct',6) // returns true
verifier.isLengthen('incorrect',10) // returns false

// ageCalc
verifier.ageCalc('2005-02-22') //  16
verifier.ageCalc('2000-02-22') //  21

// isAgeValid
verifier.isAgeValid('2005-02-22') // returns false
verifier.isAgeValid('2000-02-22') // returns true
verifier.isAgeValid('2005-02-22',14) // returns true

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

- Form Functions
  1. isUsername
  2. isUsernameRT
  3. isPassword
  4. isPasswordRT
  5. isEmail
  6. isLengthen
  7. ageCalc
  8. isAgeValid
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
