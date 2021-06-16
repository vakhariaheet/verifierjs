# Verifier

A tiny js library for Form validation.

![Node Version](https://badgen.net/npm/node/next)
[![Codecov Coverage](https://badgen.net/codecov/c/github/vakhariaheet/verifierjs)](https://codecov.io/gh/vakhariaheet/verifierjs/)
[![install size](https://packagephobia.com/badge?p=verifierjs)](https://packagephobia.com/result?p=verifierjs)
[![License](https://img.shields.io/npm/l/verifierjs)](https://cdn.jsdelivr.net/npm/verifierjs@0.4.3/LICENSE)

## Installation

```bash
npm install verifierjs --save
```

```bash
yarn add verifierjs
```

## Import

```javascript
import { Verifier } from "verifierjs";
```

```JavaScript
// CommonJS
const { Verifier } = require('verifierjs');
```

```html
<!-- Vanilla JS -->
<script src="https://unpkg.com/browse/verifierjs/dist/index.min.js">
  <script>
  <script>
    const { Verifier } = verifierjs;
</script>
```

##### Note

Color conversion functions are transfered to [color-converter](https://www.npmjs.com/package/color-convertor)

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
// ageCalc
new Verifier('2005-02-22').ageCalc() //  16
new Verifier().ageCalc('2000-02-22') //  21

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

- Chaineble Functions
  1. isUsername
  2. isPassword
  3. isEmail
  4. isLengthen
- Non Chaineble Methods
  1. array : returns array in which first element is array of properties(validation) names
     and second element is array of properties(validation) values
  2. ageCalc : Calculates Age
