// jest.config.ts
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ["json-summary"]
};
export default config;