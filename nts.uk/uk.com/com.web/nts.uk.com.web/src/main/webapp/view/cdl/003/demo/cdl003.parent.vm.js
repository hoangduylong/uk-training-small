var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl003;
                (function (cdl003) {
                    var parent;
                    (function (parent) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    //construct codes 
                                    self.canSelectClassificationCodes = ko.observable('');
                                    self.selectMode = ko.observable(true);
                                    self.showNoSelection = ko.observable(false);
                                    self.selectClassificationCodes = ko.observable('');
                                }
                                /**
                                 * open dialog cdl003
                                 */
                                ScreenModel.prototype.openDialogCDL003 = function () {
                                    var self = this;
                                    var canSelected = self.canSelectClassificationCodes() ? self.canSelectClassificationCodes().split(',') : [];
                                    nts.uk.ui.windows.setShared('inputCDL003', {
                                        selectedCodes: self.selectMode() ? canSelected : canSelected[0],
                                        showNoSelection: self.showNoSelection(),
                                        isMultiple: self.selectMode()
                                    }, true);
                                    nts.uk.ui.windows.sub.modal('/view/cdl/003/a/index.xhtml').onClosed(function () {
                                        //view all code of selected item 
                                        var output = nts.uk.ui.windows.getShared('outputCDL003');
                                        if (output) {
                                            self.selectClassificationCodes(output);
                                        }
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = parent.viewmodel || (parent.viewmodel = {}));
                    })(parent = cdl003.parent || (cdl003.parent = {}));
                })(cdl003 = view.cdl003 || (view.cdl003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl003.parent.vm.js.map