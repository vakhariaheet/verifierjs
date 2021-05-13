# Verifier

A js library for utils functions

- includes Functions for Form Validation
- Conversion Functions

## Installation

`npm install verifierjs --save`

`yarn add verifierjs`

## Import

```
 import verifier from 'verifierjs';
```

```
// CommonJS
const verifier = require('verifierjs');
```

### Usage

```
// isUsername
verifier.isUsername('username')// returns true
verifier.isUsername('username',/\w{1,}/)// returns true

// isPassword
verifier.isPassword('secret') // returns true
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

```
{
    [errName]: RegExp,
    ...
}
```
