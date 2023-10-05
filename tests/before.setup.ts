import {test as setup, expect} from '@playwright/test';

setup('is a before setup', () => {
  expect(true).toBeTruthy();
});
