module nts.uk.ui.sample {

    export module datepicker {
        @bean()
        export class ScreenModel extends ko.ViewModel {
            dateString: KnockoutObservable<string> = ko.observable('20000101');
            date: KnockoutObservable<Date> = ko.observable(nts.uk.time.UTCDate(2000, 0, 1));
            yearMonth: KnockoutObservable<string> = ko.observable("200002");
            enable: KnockoutObservable<boolean> = ko.observable(true);
        }
    }
}