# playwright-json-summary-reporter

![npm (scoped)](https://img.shields.io/npm/v/playwright-json-summary-reporter)

This package can be installed to generate a simple `summary.json` file that can be used as apart of a `Playwright Test` automation framework. My main use case for building this is to have quick access to a list of failed or succeeded tests for re-running failures (outside of playwright's retry functionality). I also use this as a way to quickly identify if all tests passed within a github action.

## Install

```bash
npm install playwright-json-summary-reporter --save-dev
```

## Usage

Modify your `playwright.config.ts` file to include the reporter:

```js
  reporter: [
    ['playwright-json-summary-reporter'],
    ['html'], // other reporters
    ['dot']
  ],
```

Now when you run a test there should be a new file `summary.json` that gets saved to the root of the directory. An example of the file is shown below.

```json
{
  "durationInMS": 3260,
  "passed": [
    "before.setup.ts:3:6",
    "after.teardown.ts:3:9",
    "tests.spec.ts:6:7",
    "tests.spec.ts:9:7",
    "tests.spec.ts:12:7",
    "tests.spec.ts:18:7",
    "tests.spec.ts:28:7"
  ],
  "skipped": [
    "tests.spec.ts:21:8"
  ],
  "failed": [
    "tests.spec.ts:15:7"
  ],
  "warned": [],
  "interrupted": [],
  "timedOut": [
    "tests.spec.ts:24:7"
  ],
  "flakey": [
    "tests.spec.ts:18:7"
  ],
  "status": "failed",
  "startedAt": 1696537674443
}
```

If you found this helpful feel free to check out <https://playwrightsolutions.com>!

**Note:** 

* This reporter doesn't support parameterized tests.
* The tests that are listed in flakey are also listed in the passed array, but not in the failed array. This was a decision that I made as the test eventually passed.
