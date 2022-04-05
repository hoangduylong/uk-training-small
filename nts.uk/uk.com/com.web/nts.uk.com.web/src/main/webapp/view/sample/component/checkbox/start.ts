module nts.uk.ui.sample.checkbox {
    @bean()
    export class ScreenModel extends ko.ViewModel {
        checked: KnockoutObservable<boolean> = ko.observable(true);
        readonly: KnockoutObservable<boolean> = ko.observable(true);
        enable: KnockoutObservable<boolean> = ko.observable(false);
    }
}