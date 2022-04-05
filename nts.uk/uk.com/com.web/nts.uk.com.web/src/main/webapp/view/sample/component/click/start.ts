module nts.uk.ui.sample {
    @bean()
    export class ViewModel extends ko.ViewModel {
        timeClick: KnockoutObservable<number> = ko.observable(500);

        timeClickNumber!: KnockoutComputed<number>;

        created() {
            const vm = this;

            vm.timeClickNumber = ko.computed({
                read: () => {
                    return Number(ko.unwrap(vm.timeClick));
                }
            });
        }

        clickEvent() {
            $('#clickResult').append($('<pre>', { text: `click at: ${new Date().toJSON()}` }));
        }
    }
}