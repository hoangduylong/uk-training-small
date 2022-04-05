module sample.datepicker.viewmodel {
    export class ScreenModel {
        dateString: KnockoutObservable<string>;
        date: KnockoutObservable<Date>;
        yearMonth: KnockoutObservable<number>;
        year: KnockoutObservable<number>;
        fiscalYear: KnockoutObservable<number>;
        constructor() {
            var self = this;
            self.dateString = ko.observable('20000101');
            self.yearMonth = ko.observable("200002");
            self.year = ko.observable("2010");
            self.fiscalYear = ko.observable("2011");
            
            // Define styles
            self.cssRangerY = [{ 2000: "round-gray" }, { 2009: "round-green" }, { 2011: "rect-pink" }, { 2017: "round-purple" }];
            self.cssRangerYM = { 2000: [{ 1: "round-green" }, { 5: "round-yellow" }],
                                2002: [ 1, { 5: "round-gray" }]};
            self.cssRangerYMD = {
                2000: {1: [{ 11: "round-green" }, { 12: "round-orange" }, { 15: "rect-pink" }], 3: [{ 1: "round-green" }, { 2: "round-purple" }, 3 ]},
                2002: {1: [{ 11: "round-green" }, { 12: "round-green" }, { 15: "round-green" }], 3: [{ 1: "round-green" }, { 2: "round-green" }, { 3: "round-green" }]} 
            };
        }
    }
}