import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 2,
  trace: 'on-first-retry',
  reporter: [['list'], ['./src/index.ts']],
  projects: [
    {name: 'setup', testMatch: /.setup.ts/},
    {
      name: 'tests',
      dependencies: ['setup'],
    },
    {
      name: 'teardown',
      dependencies: ['setup'],
      testMatch: /.teardown.ts/,
    },
  ],
});
