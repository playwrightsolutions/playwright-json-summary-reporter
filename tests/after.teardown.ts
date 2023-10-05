import {test as teardown, expect} from '@playwright/test';

teardown('is a after setup', () => {
  expect(true).toBeTruthy();
});
