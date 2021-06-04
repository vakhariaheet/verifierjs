const verifier = require("./../dist/index.js");
test("isUsername", () => {
  expect(verifier.isUsername("username")).toBe(true);
  expect(verifier.isUsername("$username")).toBe(false);
  expect(verifier.isUsername("username", /\w{1,}/)).toBe(true);
}, 500);
test("isPassword", () => {
  expect(verifier.isPassword("secret")).toBe(false);
  expect(verifier.isPassword("secreT@123")).toBe(true);
  expect(verifier.isPassword("secret", /.{1,}/)).toBe(true);
});
test("isUsernameRT", () => {
  expect(verifier.isUsernameRT("u$sername")).toStrictEqual({
    start: false,
    syntax: true,
  });
  expect(verifier.isUsernameRT("223sername")).toStrictEqual({
    start: true,
    syntax: false,
  });

  expect(
    verifier.isUsernameRT("username", {
      length: /.{4,}/,
      start: /^[a-zA-Z]{1,}/,
    })
  ).toStrictEqual({ length: false, start: false });
}, 500);
test("isPasswordRT", () => {
  expect(verifier.isPasswordRT("hello")).toStrictEqual({
    length: true,
    lowercase: false,
    uppercase: true,
    symbol: true,
  });
  expect(verifier.isPasswordRT("secreT@123")).toStrictEqual({
    length: false,
    lowercase: false,
    uppercase: false,
    symbol: false,
  });
  expect(verifier.isPasswordRT("secreT", { length: /\w{1,}/ })).toStrictEqual({
    length: false,
  });
}, 500);
test("isEmail", () => {
  expect(verifier.isEmail("wrongEmail")).toBe(false);
  expect(verifier.isEmail("example@domain.com")).toBe(true);
});
test("isLengthen", () => {
  expect(verifier.isLengthen("hello", 5)).toBe(true);
  expect(verifier.isLengthen("lt15", "lt5")).toBe(true);
  expect(verifier.isLengthen("greaterthan", "gt14")).toBe(false);
  expect(verifier.isLengthen("both", "gt4 lt10")).toBe(false);
});
test("ageCalc", () => {
  expect(verifier.ageCalc("2005-02-22")).toBe(16);
  expect(verifier.ageCalc("2000-02-22")).toBe(21);
}, 500);
test("isAgeValid", () => {
  expect(verifier.isAgeValid("2005-02-22")).toBe(false);
  expect(verifier.isAgeValid("2000-02-22", 21)).toBe(true);
});
test("isCustom", () => {
  const { includes } = verifier;
  expect(
    verifier.custom(
      "hello@ga.com",
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
    )
  ).toStrictEqual({
    length: false,
    vstr: false,
  });
  expect(
    verifier.custom("hello", {
      length: 5,
      start: "he",
      end: "wrong",
      includes: includes("heslaja"),
      excludes: "wholeHello",
    })
  ).toStrictEqual({
    length: false,
    includes: false,
    excludes: false,
    start: false,
    end: true,
  });
});
