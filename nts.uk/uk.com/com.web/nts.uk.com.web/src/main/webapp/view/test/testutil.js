/// <reference path="../nts.uk.com.web.nittsu.bundles.d.ts"/>
var kiban;
(function (kiban) {
    var test;
    (function (test) {
        function assert(name) {
            return new Assertion(name);
        }
        test.assert = assert;
        var AssertThat = /** @class */ (function () {
            function AssertThat(assertion, actual, matcher) {
                this.assertion = assertion;
                this.actual = actual;
                this.matcher = matcher;
            }
            AssertThat.prototype.verify = function () {
                var result = this.matcher.match(this.actual);
                if (result === true) {
                    console.log('OK: ' + this.assertion.name);
                }
                else {
                    console.log('FAILED: ' + this.matcher.message(this.actual));
                }
            };
            return AssertThat;
        }());
        test.AssertThat = AssertThat;
        var Assertion = /** @class */ (function () {
            function Assertion(name) {
                this.name = name;
            }
            Assertion.prototype.that = function (actual, matcher) {
                var at = new AssertThat(this, actual, matcher);
                at.verify();
            };
            return Assertion;
        }());
        test.Assertion = Assertion;
        function is(expected) {
            return {
                match: function (actual) { return actual === expected; },
                message: function (actual) { return 'expected: ' + expected + ', but was: ' + actual; }
            };
        }
        test.is = is;
        function isNotANumber() {
            return {
                match: function (actual) { return isNaN(actual); },
                message: function (actual) { return 'expected: NaN, but was: ' + actual; }
            };
        }
        test.isNotANumber = isNotANumber;
    })(test = kiban.test || (kiban.test = {}));
})(kiban || (kiban = {}));
//# sourceMappingURL=testutil.js.map