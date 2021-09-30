# Verifier

A tiny js library for Form validation.

![Node Version](https://badgen.net/npm/node/next)
[![License](https://img.shields.io/npm/l/verifierjs)](https://cdn.jsdelivr.net/npm/verifierjs@0.4.3/LICENSE)
[![Min Size](https://badgen.net/bundlephobia/min/verifierjs)](https://bundlephobia.com/package/verifierjs)
![Statements](https://img.shields.io/badge/statements-96.27%25-brightgreen.svg)
![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg)

## Installation

```bash
npm install verifierjs --save
```

```bash
yarn add verifierjs
```

## Import

```javascript
import { Verifier, anyone } from "verifierjs/index";
```

```JavaScript
// CommonJS
const { Verifier,anyone } = require('verifierjs');
```

```html
<!-- Vanilla JS -->
    <script src="https://unpkg.com/browse/verifierjs/dist/index.min.js"><script>
    <script>
    const { Verifier,anyone } = verifierjs;
    </script>
```

##### Note

Color conversion functions are transferred to [color-converter](https://www.npmjs.com/package/color-convertor)

### Usage

```JavaScript
// isUsername
new Verifier('username').isUsername().correct// returns true
new Verifier('$username').isUsername().correct// returns false
new Verifier('username').isUsername(/\w{4,}/).correct// returns true
new Verifier('username').isUsername({length:/\w{4,}/}).details// returns {lenght:true}

// isPassword
new Verifier('secret').isPassword().correct // returns false
new Verifier('secreT@123').isPassword().correct // returns true
new Verifier('secret').isPassword(/.{1,}/).correct // returns true
new Verifier('secret').isPassword({length:/.{1,}/}).details // returns{lenght:true}
// isEmail
new Verifier('wrongEmail@.com').isEmail().correct // returns false
new Verifier('example@example.com.in').isEmail().correct// returns true

// isLengthen
new Verifier('exact').isLengthen(5).correct // returns true
new Verifier('greaterthan').isLengthen('gt10').correct // returns true
new Verifier('lowerthan').isLengthen('lt10').correct // returns true

//excludes
new Verifier("hello").excludes("bye").correct //returns true
new Verifier("hello").excludes(anyone("bye")).correct //returns false
new Verifier("hey!hello").excludes("hello").details.excludes //returns false

//includes
new Verifier("hello").includes("bye").correct //returns false
new Verifier("hello").includes(anyone("bye")).correct //returns true
new Verifier("hey!hello").includes("hello").details.includes //returns true

// consistOf
new Verifier("helloG").consistOf({
     uppercaseAlpha:true,
     lowercaseAlpha:true
     }).correct //returns true
new Verifier("hello_G").consistOf({
     uppercaseAlpha:true,
     lowercaseAlpha:true,
     custom:"_-"
     }).correct //returns true
new Verifier("hello_G").consistOf({
     uppercaseAlpha:true,
     lowercaseAlpha:true,
     }).correct //returns false

// ageCalc
new Verifier('2005-02-22').ageCalc() //  16
new Verifier('WrongFormat').ageCalc() //  Error Verifier.ageCalc:Invalid Date



// array - Can be use on any chaineble method
new Verifier('hello').isLengthen(5).array() //  returns [[length],[true]]
new Verifier('username').isUsername().isLengthen("gt4 lt30").array() // returns[["start", "syntax", "length"],[true, true, true]]
```

Verifier Class Properties

```
{
    correct: true If all the validation is successful,
    details: detail version of `correct`,
    ... All methods
}
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

- DOB Format : YY-MM-DD

#### Chainable Functions

1. isUsername
2. isPassword
3. isEmail
4. isLengthen
5. consistOf
6. includes
7. excludes

#### Non Chainable Methods

1. array : returns array in which first element is array of properties(validation) names
   and second element is array of properties(validation) values
2. ageCalc : Calculates Age

#### Helper Function

1. anyone:

```JavaScript
 new Verifier("heldajsjfsa").includes(anyone("hello")).correct // return true
```

- What it basically does is that it tells the includes function that if string(which is to verify) contains "h" or "e" or "l" or "o" if anyone of them does then just check if remaining functions in the chain are passed if they had then just set correct to true

- Same goes for excludes func check if "h" or "e" or "l" or "o" is present in the string if anyone of them does then just set correct to false

## Bugs and Issues

If you encounter any bugs or issues, feel free to [open an issue at
github](https://github.com/vakhariaheet/verifierjs/issues) or email me to
<heetkv@gmail.com>. I also always like to hear from you, if you’re using my code.
