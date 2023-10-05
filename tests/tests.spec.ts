// create a passing test
import {test, expect, testInfo} from '@playwright/test';

test.describe('is a passing test', () => {
  test.describe.configure({timeout: 200});
  test('is a passing test 1', async () => {
    expect(true).toBeTruthy();
  });
  test('is a passing test 2', async () => {
    expect(true).toBeTruthy();
  });
  test('is a passing test 3', async () => {
    expect(true).toBeTruthy();
  });
  test('is a failing test 4', async () => {
    expect(false).toBeTruthy();
  });
  test('is a flaky test 5', async ({}, testInfo) => {
    expect(testInfo.retry).toBe(2);
  });
  test.skip('is a skipped test 6', async () => {
    expect(2).toBe(2);
  });
  test('is a test that will timeout test 7', async () => {
    await new Promise(r => setTimeout(r, 300));
    expect(true).toBeTruthy();
  });
  test('is a test that will timeout test 8 @warn', async () => {
    expect(true).toBeTruthy();
  });
});
