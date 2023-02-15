"use strict";
exports.__esModule = true;
var fs = require("fs");
var JSONSummaryReporter = /** @class */ (function () {
    function JSONSummaryReporter() {
        this.durationInMS = -1;
        this.passed = [];
        this.skipped = [];
        this.failed = [];
        this.warned = [];
        this.timedOut = [];
        this.status = 'unknown';
        this.startedAt = 0;
    }
    JSONSummaryReporter.prototype.onBegin = function () {
        this.startedAt = Date.now();
    };
    JSONSummaryReporter.prototype.onTestEnd = function (test, result) {
        var title = [];
        var fileName = [];
        var clean = true;
        for (var _i = 0, _a = test.titlePath(); _i < _a.length; _i++) {
            var s = _a[_i];
            if (s === '' && clean)
                continue;
            clean = false;
            title.push(s);
            if (s.includes('spec.ts')) {
                fileName.push(s);
            }
        }
        // This will publish the file name + line number test begins on
        var z = "".concat(fileName[0], ":").concat(test.location.line, ":").concat(test.location.column);
        // Using the t variable in the push will push a full test test name + test description
        var t = title.join(' > ');
        var status = !['passed', 'skipped'].includes(result.status) && t.includes('@warn')
            ? 'warned'
            : result.status;
        this[status].push(z);
    };
    JSONSummaryReporter.prototype.onEnd = function (result) {
        var _this = this;
        this.durationInMS = Date.now() - this.startedAt;
        this.status = result.status;
        // removing duplicate tests from passed array
        this.passed = this.passed.filter(function (element, index) {
            return _this.passed.indexOf(element) === index;
        });
        // removing duplicate and flakey (passed on a retry) tests from the failed array
        this.failed = this.failed.filter(function (element, index) {
            if (!_this.passed.includes(element))
                return _this.failed.indexOf(element) === index;
        });
        fs.writeFileSync('./summary.json', JSON.stringify(this, null, '  '));
    };
    return JSONSummaryReporter;
}());
exports["default"] = JSONSummaryReporter;
