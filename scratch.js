const {Verifier} = require("./index");
console.log("hello")
const func =  new Verifier("hello").isLengthen("gt4").excludes("yr").function();
console.log(func.toString())
console.log(func("hello"))