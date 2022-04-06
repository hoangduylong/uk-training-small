var test2;
(function (test2) {
    var viewmodel;
    (function (viewmodel) {
        var getShared = nts.uk.ui.windows.getShared;
        var ScreenModel = /** @class */ (function () {
            function ScreenModel() {
                this.currentIds = ko.observable([]);
                this.currentCodes = ko.observable([]);
                this.currentNames = ko.observable([]);
                this.alreadySettingList = ko.observable(['1']);
                var self = this;
                var dataShare = getShared('KCP011_TEST');
                self.options = {
                    // neu muon lay code ra tu trong list thi bind gia tri nay vao
                    currentCodes: self.currentCodes,
                    currentNames: self.currentNames,
                    // tuong tu voi id
                    currentIds: self.currentIds,
                    //
                    multiple: dataShare.multiple,
                    tabindex: 2,
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
            ScreenModel.prototype.startPage = function () {
                var self = this;
                var dfd = $.Deferred();
                dfd.resolve();
                return dfd.promise();
            };
            ScreenModel.prototype.testAlreadySetting = function () {
                var self = this;
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
                    tabindex: 2,
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
            };
            /**
             * cancel
             */
            ScreenModel.prototype.cancel = function () {
                nts.uk.ui.windows.close();
            };
            ;
            return ScreenModel;
        }());
        viewmodel.ScreenModel = ScreenModel;
    })(viewmodel = test2.viewmodel || (test2.viewmodel = {}));
})(test2 || (test2 = {}));
//# sourceMappingURL=test.vm.js.map