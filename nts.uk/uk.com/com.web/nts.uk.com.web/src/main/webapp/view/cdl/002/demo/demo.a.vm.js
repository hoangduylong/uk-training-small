var demo;
(function (demo) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    self.isMultiSelect = ko.observable(true);
                    self.selectedCodes = ko.observableArray([]);
                    self.selectedCode = ko.observable('');
                    self.selectedItem = ko.observable(self.isMultiSelect() ? self.selectedCodes() : self.selectedCode());
                    self.isDisplayUnselect = ko.observable(false);
                    self.isShowWorkClosure = ko.observable(false);
                    self.valueReturn = ko.observable(null);
                    self.isMultiSelect.subscribe(function (data) {
                        if (data) {
                            if (self.isDisplayUnselect()) {
                                self.isDisplayUnselect(false);
                            }
                            self.selectedItem(self.selectedCodes());
                        }
                        else {
                            self.selectedItem(self.selectedCode());
                        }
                    });
                    self.isDisplayUnselect.subscribe(function (data) {
                        if (data && self.isMultiSelect()) {
                            nts.uk.ui.dialog.alert("Displaying Unselect Item is not available for Multiple Selection!");
                            self.isDisplayUnselect(false);
                        }
                    });
                    self.selectionOption = ko.observableArray([
                        { code: 0, name: 'Single Selection' },
                        { code: 1, name: 'Multiple Selection' },
                    ]);
                    self.selectedOption = ko.observable(self.isMultiSelect() ? 1 : 0);
                    self.selectedOption.subscribe(function (data) {
                        if (data == 0) {
                            self.isMultiSelect(false);
                        }
                        else {
                            self.isMultiSelect(true);
                        }
                    });
                }
                // Open Dialog CDL002
                ScreenModel.prototype.openDialog = function () {
                    var self = this;
                    setShared('CDL002Params', {
                        isMultiple: self.isMultiSelect(),
                        selectedCodes: _.split(self.selectedItem(), ','),
                        showNoSelection: self.isDisplayUnselect(),
                        isShowWorkClosure: self.isShowWorkClosure()
                    }, true);
                    nts.uk.ui.windows.sub.modal("/view/cdl/002/a/index.xhtml").onClosed(function () {
                        var isCancel = getShared('CDL002Cancel');
                        if (isCancel) {
                            return;
                        }
                        var output = getShared('CDL002Output');
                        self.valueReturn(output);
                        self.selectedItem(output);
                    });
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = demo.a || (demo.a = {}));
})(demo || (demo = {}));
//# sourceMappingURL=demo.a.vm.js.map