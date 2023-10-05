// create a passing test
import {test, expect} from '@playwright/test';

// This reporter doesn't handle parameterized tests
// test.describe('is parameterized', () => {
//   const people = ['Alice', 'Bob'];
//   for (const name of people) {
//     test(`testing with ${name}`, async () => {
//       expect(name).toBe('Bob');
//     });
//   }
// });
