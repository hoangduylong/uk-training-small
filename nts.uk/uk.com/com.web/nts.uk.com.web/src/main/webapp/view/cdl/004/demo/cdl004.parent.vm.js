var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl004;
                (function (cdl004) {
                    var parent;
                    (function (parent) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    //construct codes 
                                    self.canSelectJobtitleCodes = ko.observable('00000000-0000-0000-0000-000000000006,00000000-0000-0000-0000-000000000005');
                                    self.selectMode = ko.observable(true);
                                    self.showNoSelection = ko.observable(false);
                                    self.selectJobtitleCodes = ko.observable('');
                                    self.baseDate = ko.observable(new Date());
                                    self.isShowBaseDate = ko.observable(false);
                                }
                                /**
                                 * open dialog cdl004
                                 */
                                ScreenModel.prototype.openDialogCDL004 = function () {
                                    var self = this;
                                    var canSelected = self.canSelectJobtitleCodes() ? self.canSelectJobtitleCodes().split(',') : [];
                                    nts.uk.ui.windows.setShared('inputCDL004', {
                                        baseDate: self.baseDate(),
                                        selectedCodes: self.selectMode() ? canSelected : canSelected[0],
                                        showNoSelection: self.showNoSelection(),
                                        isMultiple: self.selectMode(),
                                        isShowBaseDate: self.isShowBaseDate()
                                    }, true);
                                    nts.uk.ui.windows.sub.modal('/view/cdl/004/a/index.xhtml').onClosed(function () {
                                        var isCancel = nts.uk.ui.windows.getShared('CDL004Cancel');
                                        if (isCancel) {
                                            return;
                                        }
                                        //view all code of selected item 
                                        var output = nts.uk.ui.windows.getShared('outputCDL004');
                                        self.selectJobtitleCodes(output);
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = parent.viewmodel || (parent.viewmodel = {}));
                    })(parent = cdl004.parent || (cdl004.parent = {}));
                })(cdl004 = view.cdl004 || (view.cdl004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl004.parent.vm.js.map