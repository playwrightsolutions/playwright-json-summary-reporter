# @bmayhew/playwright-json-summary-reporter

![npm (scoped)](https://img.shields.io/npm/v/@butchmayhew/playwright-json-summary-reporter)

This package can be installed to generate a simple `summary.json` file that can be used as apart of a `Playwright Test` automation framework. My main use case for building this is to have quick access to a list of failed or succeeded tests for re-running failures (outside of playwright's retry functionality). I also use this as a way to quickly identify if all tests passed within a github action.

## Install

```bash
npm install @butchmayhew/playwright-json-summary-reporter --save-dev
```

## Usage

Modify your `playwright.config.ts` file to include the reporter:

```js
  reporter: [
    ['@butchmayhew/playwright-json-summary-reporter'],
    ['html'], // other reporters
    ['dot']
  ],
```

Now when you run a test there should be a new file `summary.json` that gets saved to the root of the directory. An example of the file is shown below.

```json
{
  "durationInMS": 41565,
  "passed": [
    "api/create-user-account.spec.ts:34:3",
    "api/create-user-account.spec.ts:55:3",
    "api/delete-user-account.spec.ts:47:3",
    "api/login.spec.ts:12:3",
    "api/login.spec.ts:37:3",
    "api/login.spec.ts:61:3",
    "api/login.spec.ts:84:3",
    "ui/codepen/copyToClipboard.spec.ts:5:1",
    "ui/codepen/copyToClipboard.spec.ts:17:1",
    "ui/internet.app/selectPresentElement.spec.ts:10:1",
    "ui/internet.app/selectPresentElement.spec.ts:35:1",
    "ui/grep.spec.ts:4:3",
    "ui/grep.spec.ts:9:3",
    "ui/loginUser.spec.ts:22:3",
    "ui/loginUserNoImages.spec.ts:23:3",
    "ui/loginUser.spec.ts:37:3",
    "ui/loginUserNoImages.spec.ts:40:3",
    "ui/registerUser.spec.ts:17:1"
  ],
  "skipped": [],
  "failed": [],
  "warned": [],
  "timedOut": [],
  "status": "passed",
  "startedAt": 1674431153277
}
```

If you found this helpful feel free to check out <https://playwrightsolutions.com>!
