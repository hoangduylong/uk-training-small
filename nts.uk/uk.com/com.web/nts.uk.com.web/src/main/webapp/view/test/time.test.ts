/// <reference path="../nts.uk.com.web.nittsu.bundles.d.ts"/>
/// <reference path="testutil.ts"/>


module kiban.test {
    
    import mbt = nts.uk.time.minutesBased;
    
    module duration {
        module parseString {
            console.log('duration.parseString()');
            
            let t = s => mbt.duration.parseString(s).toValue();
            
            assert('10:00').that(t('10:00'), is(600));
            
            assert('0').that(t('0'), is(0));
            
            assert('-1').that(t('-1'), is(-1));
            
            assert('59').that(t('59'), is(59));
            assert('60 is NaN').that(t('60'), isNotANumber());
            
            assert('1:00').that(t('1:00'), is(60));
            assert('0:59').that(t('0:59'), is(59));
            
            assert('100').that(t('100'), is(60));
            
            assert('-100').that(t('-100'), is(-60));
        }
    }
    
    module format {
        module byId {
            console.log("format.byId()");
            
            let t = nts.uk.time.format.byId;
            
            assert("Clock_Short_HM 10").that(t("Clock_Short_HM", 10), is("0:10"));
            assert("Clock_Short_HM -10").that(t("Clock_Short_HM", -10), is("-23:50"));
            
            assert("ClockDay_Short_HM 10").that(t("ClockDay_Short_HM", 10), is("当日0:10"));
            assert("ClockDay_Short_HM -10").that(t("ClockDay_Short_HM", -10), is("前日23:50"));
            assert("ClockDay_Short_HM 1450").that(t("ClockDay_Short_HM", 1450), is("翌日0:10"));
            assert("ClockDay_Short_HM 2890").that(t("ClockDay_Short_HM", 2890), is("翌々日0:10"));
            
        }
    }
    
}