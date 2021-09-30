import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import minify from "rollup-plugin-terser";
import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
export default [
  {
    input: "./index.ts",
    output: [
      {
        name: "verifierjs",
        file: pkg.browser,
        format: "iife",
        exports: "named",
      },
    ],

    plugins: [
      resolve(),
      typescript({ module: "esnext" }),
      commonjs({
        namedExports: { Verifier: ["Verifier"] },
      }),
      minify({ comments: false }),
    ],
  },
];
