module nts.uk.com.view.kcp016.test.viewmodel {
    const API = {
    };

    @bean()
    class ViewModel extends ko.ViewModel {
        multiple: KnockoutObservable<boolean>;
        onDialog: KnockoutObservable<boolean>;
        selectType: KnockoutObservable<number>;
        rows: KnockoutObservable<number>;
        selectTypes: KnockoutObservableArray<any>;
        showNoSelectionItem: KnockoutObservable<boolean>;
        value: any;

        componentName: KnockoutObservable<string> = ko.observable("kcp016-component");

        created(params: any) {
            const vm = this;
            vm.multiple = ko.observable(true);
            vm.showNoSelectionItem = ko.observable(false);
            vm.onDialog = ko.observable(false);
            vm.selectType = ko.observable(1);
            vm.rows = ko.observable(10);
            vm.selectTypes = ko.observableArray([
                {value: 1, name: "Selected List"},
                {value: 2, name: "Select All", enable: vm.multiple},
                {value: 3, name: "Select First"},
                {value: 4, name: "Select None"}
            ]);
            vm.value = ko.observableArray(["02", "04", "06"]);
        }

        mounted() {
            const vm = this;
            vm.multiple.subscribe(value => {
                if (value) {
                    vm.value = ko.observableArray(["02", "04", "06"]);
                } else {
                    vm.value = ko.observable("02");
                }
                vm.componentName.valueHasMutated();
            });
            vm.showNoSelectionItem.subscribe(value => {
                if (!value) {
                    vm.value = ko.observableArray(["02", "04", "06"]);
                } else {
                    vm.value = ko.observable("02");
                }
                vm.componentName.valueHasMutated();
            });
            vm.onDialog.subscribe(value => {
                if (vm.multiple()) {
                    vm.value = ko.observableArray(["02", "04", "06"]);
                } else {
                    vm.value = ko.observable("02");
                }
                vm.componentName.valueHasMutated();
            });
            vm.selectType.subscribe(value => {
                if (vm.multiple()) {
                    vm.value = ko.observableArray(["02", "04", "06"]);
                } else {
                    vm.value = ko.observable("02");
                }
                vm.componentName.valueHasMutated();
            });
            vm.rows.subscribe(value => {
                if (vm.multiple()) {
                    vm.value = ko.observableArray(["02", "04", "06"]);
                } else {
                    vm.value = ko.observable("02");
                }
                vm.componentName.valueHasMutated();
            });
        }

    }

}