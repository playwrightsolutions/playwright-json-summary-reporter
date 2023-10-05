import * as fs from 'fs';
import {
  TestCase,
  TestResult,
  Reporter,
  FullResult,
} from '@playwright/test/reporter';

export interface Summary {
  durationInMS: number;
  passed: string[];
  skipped: string[];
  failed: string[];
  warned: string[];
  interrupted: string[];
  timedOut: string[];
  flakey: string[];

  status: FullResult['status'] | 'unknown' | 'warned' | 'skipped';
}

class JSONSummaryReporter implements Reporter, Summary {
  durationInMS = -1;
  passed: string[] = [];
  skipped: string[] = [];
  failed: string[] = [];
  warned: string[] = [];
  interrupted: string[] = [];
  timedOut: string[] = [];
  flakey: string[] = [];

  status: Summary['status'] = 'unknown';
  startedAt = 0;

  onBegin() {
    this.startedAt = Date.now();
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const title = [];
    const fileName = [];
    let clean = true;
    for (const s of test.titlePath()) {
      if (s === '' && clean) continue;
      clean = false;
      title.push(s);
      if (s.includes('.ts') || s.includes('.js')) {
        fileName.push(s);
      }
    }

    // This will publish the file name + line number test begins on
    const z = `${fileName[0]}:${test.location.line}:${test.location.column}`;

    // Using the t variable in the push will push a full test name + test description
    const t = title.join(' > ');

    // Set the status
    const status =
      !['passed', 'skipped'].includes(result.status) && t.includes('@warn')
        ? 'warned'
        : result.status;

    // Logic to push the results into the correct array
    if (result.status === 'passed' && result.retry >= 1) {
      this.flakey.push(z);
    } else {
      this[status].push(z);
    }
    this[status].push(z);
  }

  onEnd(result: FullResult) {
    this.durationInMS = Date.now() - this.startedAt;
    this.status = result.status;

    // removing duplicate tests from passed array
    this.passed = this.passed.filter((element, index) => {
      return this.passed.indexOf(element) === index;
    });

    // removing duplicate tests from the failed array
    this.failed = this.failed.filter((element, index) => {
      if (!this.passed.includes(element))
        return this.failed.indexOf(element) === index;
    });

    // removing duplicate tests from the skipped array
    this.skipped = this.skipped.filter((element, index) => {
      return this.skipped.indexOf(element) === index;
    });

    // removing duplicate tests from the timedOut array
    this.timedOut = this.timedOut.filter((element, index) => {
      return this.timedOut.indexOf(element) === index;
    });

    // removing duplicate tests from the interrupted array
    this.interrupted = this.interrupted.filter((element, index) => {
      return this.interrupted.indexOf(element) === index;
    });

    fs.writeFileSync('./summary.json', JSON.stringify(this, null, '  '));
  }
}

export default JSONSummaryReporter;
