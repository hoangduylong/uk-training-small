/// <reference path="../nts.uk.com.web.nittsu.bundles.d.ts"/>
/// <reference path="testutil.ts"/>
var kiban;
(function (kiban) {
    var test;
    (function (test) {
        var mbt = nts.uk.time.minutesBased;
        var duration;
        (function (duration) {
            var parseString;
            (function (parseString) {
                console.log('duration.parseString()');
                var t = function (s) { return mbt.duration.parseString(s).toValue(); };
                test.assert('10:00').that(t('10:00'), test.is(600));
                test.assert('0').that(t('0'), test.is(0));
                test.assert('-1').that(t('-1'), test.is(-1));
                test.assert('59').that(t('59'), test.is(59));
                test.assert('60 is NaN').that(t('60'), test.isNotANumber());
                test.assert('1:00').that(t('1:00'), test.is(60));
                test.assert('0:59').that(t('0:59'), test.is(59));
                test.assert('100').that(t('100'), test.is(60));
                test.assert('-100').that(t('-100'), test.is(-60));
            })(parseString || (parseString = {}));
        })(duration || (duration = {}));
        var format;
        (function (format) {
            var byId;
            (function (byId) {
                console.log("format.byId()");
                var t = nts.uk.time.format.byId;
                test.assert("Clock_Short_HM 10").that(t("Clock_Short_HM", 10), test.is("0:10"));
                test.assert("Clock_Short_HM -10").that(t("Clock_Short_HM", -10), test.is("-23:50"));
                test.assert("ClockDay_Short_HM 10").that(t("ClockDay_Short_HM", 10), test.is("当日0:10"));
                test.assert("ClockDay_Short_HM -10").that(t("ClockDay_Short_HM", -10), test.is("前日23:50"));
                test.assert("ClockDay_Short_HM 1450").that(t("ClockDay_Short_HM", 1450), test.is("翌日0:10"));
                test.assert("ClockDay_Short_HM 2890").that(t("ClockDay_Short_HM", 2890), test.is("翌々日0:10"));
            })(byId || (byId = {}));
        })(format || (format = {}));
    })(test = kiban.test || (kiban.test = {}));
})(kiban || (kiban = {}));
//# sourceMappingURL=time.test.js.map