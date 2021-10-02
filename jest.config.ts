// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	collectCoverage: true,
	coverageReporters: ['text', 'json-summary', 'lcov'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			statements: 100,
			lines: 100,
		},
	},
};
export default config;
