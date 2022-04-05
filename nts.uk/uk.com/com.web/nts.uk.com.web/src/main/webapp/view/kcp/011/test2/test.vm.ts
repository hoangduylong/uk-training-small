module test2.viewmodel {
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import modal = nts.uk.ui.windows.sub.modal;
    import block = nts.uk.ui.block;

    export class ScreenModel {
        options: Option;
        currentIds: KnockoutObservable<any> = ko.observable([]);
        currentCodes: KnockoutObservable<any> = ko.observable([]);
        currentNames: KnockoutObservable<any> = ko.observable([]);
        alreadySettingList: KnockoutObservableArray<any> = ko.observable(['1']);
        constructor() {
            let self = this;
            let dataShare = getShared('KCP011_TEST')
            self.options = {
                // neu muon lay code ra tu trong list thi bind gia tri nay vao
                currentCodes: self.currentCodes,
                currentNames: self.currentNames,
                // tuong tu voi id
                currentIds: self.currentIds,
                //
                multiple: dataShare.multiple,
                tabindex:2,
                isAlreadySetting: dataShare.isAlreadySetting,
                alreadySettingList: ko.observableArray(dataShare.alreadySettingList),
                // show o tim kiem
                showSearch: true,
                showPanel: dataShare.panelSetting,
                // show empty item
                showEmptyItem: dataShare.showEmptyItem,
                // trigger reload lai data cua component
                reloadData: ko.observable(''),
                reloadComponent: ko.observable({}),
                height: 370,
                // NONE = 0, FIRST = 1, ALL = 2
                selectedMode: dataShare.selectedMode
            };
        }

        startPage(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();
            dfd.resolve();
            return dfd.promise();
        }

        testAlreadySetting() {
            let self = this;
            self.alreadySettingList(['random1', 'random2', 'random3', 'random4']);
            self.options.reloadData.valueHasMutated();
            self.options.reloadComponent({
                // neu muon lay code ra tu trong list thi bind gia tri nay vao
                currentCodes: self.currentCodes,
                currentNames: self.currentNames,
                // tuong tu voi id
                currentIds: self.currentIds,
                //
                multiple: false,
                tabindex:2,
                isAlreadySetting: true,
                alreadySettingList: self.alreadySettingList,
                // show o tim kiem
                showSearch: true,
                // show empty item
                showEmptyItem: false,
                // trigger reload lai data cua component
                reloadData: ko.observable(''),
                height: 395,
                // NONE = 0, FIRST = 1, ALL = 2
                selectedMode: 1
            });
            self.options.reloadComponent.valueHasMutated();
        }

        /**
         * cancel
         */
        cancel(){
            nts.uk.ui.windows.close();
        };

    }
}