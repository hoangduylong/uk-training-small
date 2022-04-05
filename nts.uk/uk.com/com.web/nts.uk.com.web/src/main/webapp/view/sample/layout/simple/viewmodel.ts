/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.ui.sample.layout.simple {

    @bean()
    export class ViewModel extends ko.ViewModel {
        text: KnockoutObservable<string> = ko.observable('編集モード');

        size: KnockoutObservable<number> = ko.observable(20);
        icon: KnockoutObservable<string> = ko.observable('SELECTED');

        vstate: KnockoutObservable<number> = ko.observable(1);
        vstatem: KnockoutObservableArray<number> = ko.observableArray([]);

        state1: KnockoutObservable<boolean> = ko.observable(false);
        state2: KnockoutObservable<boolean> = ko.observable(true);

        click() {
            const vm = this;

            vm.$dialog.error({ messageId: 'MsgB_1', messageParams: [vm.text()] });
        }

        created() {
            const vm = this;

            _.extend(window, { vm });
        }

        contents: string = contents;
    }

    const contents = `
# h1 content
__code__ js
const wd = window;
const vm = new ko.ViewModel();
__code__
    `.replace(/__code__/g, '```');
}