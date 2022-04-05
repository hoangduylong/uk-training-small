/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.ui.sample.layout.toppage {

    @bean()
    export class ViewModel extends ko.ViewModel {
        text: KnockoutObservable<string> = ko.observable('Hello');

        click() {
            const vm = this;

            vm.$dialog.error({ messageId: 'MsgB_1', messageParams: [vm.text()] });
        }
    }
}