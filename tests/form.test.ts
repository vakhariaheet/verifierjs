

const { Verifier } = require("../index");
const  {anyone} = require("../index")
test("isUsername", () => {
  expect(new Verifier("username").isUsername().correct).toBe(true);
  expect(new Verifier("$username").isUsername().correct).toBe(false);
  expect(new Verifier("username").isUsername(/\w{1,}/).correct).toBe(true);
}, 500);
test("isPassword", () => {
  expect(new Verifier("secret").isPassword().correct).toBe(false);
  expect(new Verifier("secreT@123").isPassword().correct).toBe(true);
  expect(new Verifier("secret").isPassword({ hello: /.+/ }).correct).toBe(
    true
  );
});
test("isEmail", () => {
  expect(new Verifier("wrongEmail").isEmail().correct).toBe(false);
  expect(new Verifier("example@domain.com").isEmail().correct).toBe(true);
});
test("Chain", () => {
  expect(
    new Verifier("Hello").isUsername().isLengthen("gt4").details
  ).toStrictEqual({ length: true, start: true, syntax: true });
  expect(
    new Verifier("Hello").isUsername().isLengthen("gt4").correct
  ).toStrictEqual(true);
  expect(
    new Verifier("username").isUsername().isLengthen("gt4 lt30").array()
  ).toStrictEqual([
    ["start", "syntax", "length"],
    [true, true, true],
  ]);
});
test("isLengthen", () => {
  expect(new Verifier("hello").isLengthen(5).correct).toBe(true);
  expect(new Verifier("lt15").isLengthen("lt5").correct).toBe(true);
  expect(new Verifier("greaterthan").isLengthen("gt4").correct).toBe(true);
  expect(new Verifier("both").isLengthen("gt4 lt10").correct).toBe(false);
  // expect(new Verifier("length not given").isLengthen()).toThrow(new Error("Verifier.isLengthen lengthRequired not Specified"));
  expect(() => {new Verifier("length not given").isLengthen()}).toThrow(new Error("Verifier.isLengthen lengthRequired not Specified"));

});
test("consistOf" ,() => {
  expect(new Verifier("hello").consistOf({lowercaseAlpha:true,numbers:true}).correct).toBe(true)
})
test("ageCalc", () => {
  expect(new Verifier("2005-02-22").ageCalc()).toBe(16);
  expect(new Verifier("2000-02-22").ageCalc()).toBe(21);
  expect(() => {
    new Verifier("Wrong Date").ageCalc();
  }).toThrow(new Error("Verifier.ageCalc:Invalid Date"));
});
test("includes",() => {
  expect(new Verifier("Hello Buddy! ").includes("Hello").correct).toBe(true);
  expect(new Verifier("Hello Buddy! ").includes(anyone("naa")).correct).toBe(false);
  expect(() => {
    new Verifier("Errrrrrrr").includes(anyone())
  }).toThrow(new Error("verifierjs.anyone vstr not specified"))
  expect(() => {
    new Verifier("Errrrrrrr").includes()
  }).toThrow(new Error("Verifier.includes vstr not specified"))
})
test("excludes",() => {
  expect(new Verifier("Hello Buddy! ").excludes("Hello").correct).toBe(false);
  expect(new Verifier("Hello Buddy! ").excludes(anyone("naa")).correct).toBe(true);
  expect(() => {
    new Verifier("Errrrrrrr").excludes()
  }).toThrow(new Error("Verifier.excludes vstr not specified"))
})
