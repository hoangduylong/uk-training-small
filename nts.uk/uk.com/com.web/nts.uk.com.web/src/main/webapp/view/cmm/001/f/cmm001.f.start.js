var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm001;
                (function (cmm001) {
                    var f;
                    (function (f) {
                        __viewContext.ready(function () {
                            var screenModel = new f.viewmodel.ScreenModel();
                            screenModel.start_page().done(function () {
                                __viewContext.bind(screenModel);
                                screenModel.execution();
                            });
                        });
                    })(f = cmm001.f || (cmm001.f = {}));
                })(cmm001 = view.cmm001 || (view.cmm001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
(function ($) {
    var interval;
    $.fn.startCount = function (options, callback) {
        var settings = $.extend({
            date: null,
            offset: null
        }, options);
        // Save container
        var container = this;
        /**
         * Change client's local date to match offset timezone
         * @return {Object} Fixed Date object.
         */
        var currentDate = function () {
            // get client's current date
            var date = new Date();
            // turn date to utc
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            // set new Date object
            var new_date = new Date(utc + (3600000 * settings.offset));
            return new_date;
        };
        /**
         * Main downCount function that calculates everything
         */
        var original_date = currentDate();
        var target_date = new Date('12/31/2020 12:00:00'); // Count up to this date
        function onButtonClick() {
            original_date = currentDate();
        }
        function countdown() {
            var current_date = currentDate(); // get fixed current date
            // difference of dates
            var difference = current_date - original_date;
            if (current_date >= target_date) {
                // stop timer
                clearInterval(interval);
                if (callback && typeof callback === 'function')
                    callback();
                return;
            }
            // basic math variables
            var _second = 1000, _minute = _second * 60, _hour = _minute * 60, _day = _hour * 24;
            // calculate dates
            //            days = Math.floor(difference / _day)
            var hours = Math.floor((difference % _day) / _hour), minutes = Math.floor((difference % _hour) / _minute), seconds = Math.floor((difference % _minute) / _second);
            // fix dates so that it will show two digets
            //            days = (String(days).length >= 2) ? days : '0' + days;
            hours = (String(hours).length >= 2) ? hours : '0' + hours;
            minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
            seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;
            // based on the date change the refrence wording
            //            ref_days = (days === 1) ? 'day' : 'days',
            var ref_hours = (hours === 1) ? 'hour' : 'hours', ref_minutes = (minutes === 1) ? 'minute' : 'minutes', ref_seconds = (seconds === 1) ? 'second' : 'seconds';
            // set to DOM
            //            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);
            //            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
        }
        ;
        // start
        interval = setInterval(countdown, 1000);
    };
    $.fn.stopCount = function () {
        clearInterval(interval);
    };
}(jQuery));
//# sourceMappingURL=cmm001.f.start.js.map