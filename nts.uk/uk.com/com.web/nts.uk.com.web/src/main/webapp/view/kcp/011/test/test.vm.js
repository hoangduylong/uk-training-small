var test;
(function (test) {
    var viewmodel;
    (function (viewmodel) {
        var setShared = nts.uk.ui.windows.setShared;
        var modal = nts.uk.ui.windows.sub.modal;
        var ScreenModel = /** @class */ (function () {
            function ScreenModel() {
                this.currentIds = ko.observable([]);
                this.currentCodes = ko.observable([]);
                this.currentNames = ko.observable([]);
                this.alreadySettingList = ko.observable(['1']);
                this.multiple = ko.observable(true);
                this.isAlreadySetting = ko.observable(true);
                this.showEmptyItem = ko.observable(true);
                this.selectedMode = ko.observable(1);
                this.enable = ko.observable(true);
                this.selectedSelectionType = ko.observable(0);
                //TreeType
                this.selectedTreeType = ko.observable(0);
                this.selectedOther = ko.observable(0);
                this.selectedSetting = ko.observable(0);
                this.selectedPanel = ko.observable(1);
                var self = this;
                self.options = {
                    // neu muon lay code ra tu trong list thi bind gia tri nay vao
                    currentCodes: self.currentCodes,
                    currentNames: self.currentNames,
                    // tuong tu voi id
                    currentIds: self.currentIds,
                    //
                    multiple: true,
                    tabindex: 2,
                    isAlreadySetting: true,
                    alreadySettingList: self.alreadySettingList,
                    // show o tim kiem
                    showPanel: true,
                    // show empty item
                    showEmptyItem: false,
                    // trigger reload lai data cua component
                    reloadData: ko.observable(''),
                    height: 400,
                    // NONE = 0, FIRST = 1, ALL = 2
                    selectedMode: 1
                };
                self.listSelectionType = ko.observableArray([
                    { code: 2, name: 'Select all', enable: self.isMultipleTreeGrid },
                    { code: 1, name: 'Select first item', enable: self.enable },
                    { code: 0, name: 'No select', enable: self.enable },
                    { code: 3, name: 'Select follow ID', enable: self.enable }
                ]);
                self.listTreeType = ko.observableArray([
                    { code: 0, name: 'Single tree select grid' },
                    { code: 1, name: 'Multiple tree select grid' }
                ]);
                self.listOther = ko.observableArray([
                    { code: 1, name: 'Show empty iteam' },
                    { code: 0, name: 'Not show' }
                ]);
                self.listSetting = ko.observableArray([
                    { code: 1, name: 'Yes' },
                    { code: 0, name: 'No' }
                ]);
                self.listPanelSetting = ko.observableArray([
                    { code: 1, name: 'Yes' },
                    { code: 0, name: 'No' }
                ]);
            }
            ScreenModel.prototype.startPage = function () {
                var self = this;
                var dfd = $.Deferred();
                dfd.resolve();
                return dfd.promise();
            };
            ScreenModel.prototype.testAlreadySetting = function () {
                var self = this;
                var data = {
                    multiple: self.selectedTreeType() == 1 ? true : false,
                    isAlreadySetting: self.selectedSetting() == 1 ? true : false,
                    showEmptyItem: self.selectedOther() == 1 ? true : false,
                    selectedMode: self.selectedSelectionType(),
                    alreadySettingList: self.currentIds(),
                    panelSetting: self.selectedPanel() == 1 ? true : false
                };
                setShared('KCP011_TEST', data);
                modal("/view/kcp/011/test2/index.xhtml").onClosed(function () {
                });
            };
            return ScreenModel;
        }());
        viewmodel.ScreenModel = ScreenModel;
    })(viewmodel = test.viewmodel || (test.viewmodel = {}));
})(test || (test = {}));
//# sourceMappingURL=test.vm.js.map