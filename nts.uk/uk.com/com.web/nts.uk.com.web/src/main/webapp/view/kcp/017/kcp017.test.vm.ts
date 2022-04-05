module nts.uk.com.view.kcp017.test.viewmodel {
    const API = {
    };

    @bean()
    class ViewModel extends ko.ViewModel {
        unit: KnockoutObservable<number>; // WORKPLACE = 0, WORKPLACE GROUP = 1
        multiple: KnockoutObservable<boolean>;
        onDialog: KnockoutObservable<boolean>;
        showAlreadySetting: KnockoutObservable<boolean>;
        selectType: KnockoutObservable<number>;
        rows: KnockoutObservable<number>;
        baseDate: KnockoutObservable<any>;
        alreadySettingWorkplaces: KnockoutObservableArray<{workplaceId: string, isAlreadySetting: boolean}>;
        alreadySettingWorkplaceGroups: KnockoutObservableArray<string>;
        selectedWkpIds: KnockoutObservableArray<any> | KnockoutObservable<any>;
        selectedWkpGroupIds: KnockoutObservableArray<any> | KnockoutObservable<any>;

        selectTypes: KnockoutObservableArray<any>;

        componentName: KnockoutObservable<string> = ko.observable("kcp017-component");

        created(params: any) {
            const vm = this;
            vm.unit = ko.observable(0);
            vm.multiple = ko.observable(true);
            vm.onDialog = ko.observable(false);
            vm.showAlreadySetting = ko.observable(false);
            vm.selectType = ko.observable(1);
            vm.rows = ko.observable(10);
            vm.baseDate = ko.observable(new Date);
            vm.alreadySettingWorkplaces = ko.observableArray([]);
            vm.alreadySettingWorkplaceGroups = ko.observableArray([]);
            vm.selectedWkpIds = ko.observableArray([]);
            vm.selectedWkpGroupIds = ko.observableArray([]);

            vm.selectTypes = ko.observableArray([
                {value: 1, name: "Selected List"},
                {value: 2, name: "Select All", enable: vm.multiple},
                {value: 3, name: "Select First"},
                {value: 4, name: "Select None"}
            ]);
        }

        mounted() {
            const vm = this;
            vm.unit.subscribe(value => {
                vm.componentName.valueHasMutated();
            });
            vm.selectType.subscribe(value => {
                vm.componentName.valueHasMutated();
            });
            vm.multiple.subscribe(value => {
                if (value) {
                    vm.selectedWkpIds = ko.observableArray([]);
                    vm.selectedWkpGroupIds = ko.observableArray([]);
                } else {
                    vm.selectedWkpIds = ko.observable(null);
                    vm.selectedWkpGroupIds = ko.observable(null);
                }
                vm.componentName.valueHasMutated();
            });
            vm.onDialog.subscribe(value => {
                vm.componentName.valueHasMutated();
            });
            vm.rows.subscribe(value => {
                vm.componentName.valueHasMutated();
            });
            vm.showAlreadySetting.subscribe(value => {
                vm.componentName.valueHasMutated();
            });
        }

        saveSetting() {
            const vm = this;
            if (vm.unit() == 0) {
                vm.alreadySettingWorkplaces(vm.selectedWkpIds().map((i: string) => ({workplaceId: i, isAlreadySetting: true})));
            } else {
                vm.alreadySettingWorkplaceGroups(vm.selectedWkpGroupIds());
            }
        }

        deleteSetting() {
            const vm = this;
            if (vm.unit() == 0) {
                vm.alreadySettingWorkplaces(vm.alreadySettingWorkplaces().filter(i => vm.selectedWkpIds().indexOf(i.workplaceId) < 0));
            } else {
                vm.alreadySettingWorkplaceGroups(vm.alreadySettingWorkplaceGroups().filter(i => vm.selectedWkpGroupIds().indexOf(i) < 0));
            }
        }

    }

}