const { Verifier } = require("../index.js");
test("isUsername", () => {
  expect(new Verifier("username").isUsername().correct).toBe(true);
  expect(new Verifier("$username").isUsername().correct).toBe(false);
  expect(new Verifier("username").isUsername(/\w{1,}/).correct).toBe(true);
}, 500);
test("isPassword", () => {
  expect(new Verifier("secret").isPassword().correct).toBe(false);
  expect(new Verifier("secreT@123").isPassword().correct).toBe(true);
  expect(new Verifier("secret").isPassword({ hello: /.{1,}/ }).correct).toBe(
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
});
test("ageCalc", () => {
  expect(new Verifier("2005-02-22").ageCalc()).toBe(16);
  expect(new Verifier("2000-02-22").ageCalc()).toBe(21);
  expect(() => {
    new Verifier("Wrong Date").ageCalc();
  }).toThrow(new Error("Verifier.ageCalc:Invalid Date"));
}, 500);
