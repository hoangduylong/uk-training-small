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
                    var a;
                    (function (a) {
                        var ListType = kcp.share.list.ListType;
                        var SelectType = kcp.share.list.SelectType;
                        var viewmodel;
                        (function (viewmodel) {
                            /**
                            * Screen Model.
                            */
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.selectedMulJobtitle = ko.observableArray([]);
                                    self.selectedSelJobtitle = ko.observable('');
                                    self.isMultiple = false;
                                    self.isMultipleUse = false;
                                    self.isShowAlreadySet = false;
                                    self.isShowNoSelectRow = false;
                                    self.baseDate = ko.observable(new Date());
                                    var inputCDL004 = nts.uk.ui.windows.getShared('inputCDL004');
                                    if (inputCDL004) {
                                        self.isMultiple = inputCDL004.isMultiple;
                                        if (_.isNil(inputCDL004.isShowBaseDate)) {
                                            self.isMultipleUse = true;
                                        }
                                        else {
                                            self.isMultipleUse = inputCDL004.isShowBaseDate ? true : false;
                                        }
                                        self.baseDate(inputCDL004.baseDate);
                                        self.isShowNoSelectRow = inputCDL004.showNoSelection;
                                        if (self.isMultiple) {
                                            self.selectedMulJobtitle(inputCDL004.selectedCodes ? inputCDL004.selectedCodes : []);
                                        }
                                        else {
                                            self.selectedSelJobtitle(inputCDL004.selectedCodes);
                                        }
                                    }
                                    self.jobtitles = {
                                        isShowAlreadySet: self.isShowAlreadySet,
                                        baseDate: self.baseDate,
                                        isMultiSelect: self.isMultiple,
                                        isMultipleUse: self.isMultipleUse,
                                        listType: ListType.JOB_TITLE,
                                        selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                        isShowNoSelectRow: self.isShowNoSelectRow,
                                        selectedCode: null,
                                        isDialog: true,
                                        maxRows: 12,
                                        tabindex: 1
                                    };
                                    if (self.isMultiple) {
                                        self.jobtitles.selectedCode = self.selectedMulJobtitle;
                                    }
                                    else {
                                        self.jobtitles.selectedCode = self.selectedSelJobtitle;
                                    }
                                }
                                /**
                                 * function on click button selected job title
                                 */
                                ScreenModel.prototype.selectedJobtitle = function () {
                                    var self = this;
                                    if (self.isMultiple && self.selectedMulJobtitle().length == 0) {
                                        nts.uk.ui.dialog.alertError({ messageId: "Msg_642" });
                                        return;
                                    }
                                    var isNoSelectRowSelected = $("#jobtitle").isNoSelectRowSelected();
                                    if (!self.isMultiple && !self.selectedSelJobtitle() && !isNoSelectRowSelected) {
                                        nts.uk.ui.dialog.alertError({ messageId: "Msg_642" });
                                        return;
                                    }
                                    nts.uk.ui.windows.setShared('outputCDL004', self.isMultiple ? self.selectedMulJobtitle() : self.selectedSelJobtitle());
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * function check job title
                                 */
                                ScreenModel.prototype.checkExistJobtile = function (code, data) {
                                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                                        var item = data_1[_i];
                                        if (code === item.id) {
                                            return true;
                                        }
                                    }
                                    return false;
                                };
                                /**
                                 * close windows
                                 */
                                ScreenModel.prototype.closeWindows = function () {
                                    nts.uk.ui.windows.setShared('CDL004Cancel', true);
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cdl004.a || (cdl004.a = {}));
                })(cdl004 = view.cdl004 || (view.cdl004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl004.a.vm.js.map