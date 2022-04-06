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
                    var a;
                    (function (a_1) {
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
                                    self.selectedMulClassification = ko.observableArray([]);
                                    self.selectedSelClassification = ko.observable('');
                                    self.isMultiple = false;
                                    self.isShowNoSelectRow = false;
                                    var inputCDL003 = nts.uk.ui.windows.getShared('inputCDL003');
                                    if (inputCDL003) {
                                        self.isMultiple = inputCDL003.isMultiple;
                                        self.isShowNoSelectRow = inputCDL003.showNoSelection;
                                        if (self.isMultiple) {
                                            self.selectedMulClassification(inputCDL003.selectedCodes);
                                        }
                                        else {
                                            self.selectedSelClassification(inputCDL003.selectedCodes);
                                        }
                                    }
                                    self.classifications = {
                                        isShowAlreadySet: false,
                                        isMultiSelect: self.isMultiple,
                                        listType: ListType.Classification,
                                        selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                        isShowNoSelectRow: self.isShowNoSelectRow,
                                        selectedCode: null,
                                        isDialog: true,
                                        maxRows: 10,
                                        tabindex: 1,
                                    };
                                    if (self.isMultiple) {
                                        self.classifications.selectedCode = self.selectedMulClassification;
                                    }
                                    else {
                                        self.classifications.selectedCode = self.selectedSelClassification;
                                    }
                                }
                                /**
                                 * function on click button selected classification
                                 */
                                ScreenModel.prototype.selectedClassification = function () {
                                    var self = this;
                                    var dataList = $("#classification").getDataList();
                                    if (self.isMultiple) {
                                        var selectedCodes = self.getSelectByMul(self.selectedMulClassification(), dataList);
                                        var selectedInfors = self.getInforByMul(self.selectedMulClassification(), dataList);
                                        if (!selectedCodes || selectedCodes.length == 0) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_641" });
                                            return;
                                        }
                                        nts.uk.ui.windows.setShared('outputCDL003', selectedCodes);
                                        nts.uk.ui.windows.setShared('classificationInfoCDL003', selectedInfors);
                                        nts.uk.ui.windows.close();
                                    }
                                    else {
                                        var selectedCode = self.getSelectBySel(self.selectedSelClassification(), dataList);
                                        var selectedInfor = self.getInforBySel(self.selectedSelClassification(), dataList);
                                        var isNoSelectRowSelected = $("#classification").isNoSelectRowSelected();
                                        if (!selectedCode && !isNoSelectRowSelected) {
                                            // Check if selected No select Row.
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_641" });
                                            return;
                                        }
                                        nts.uk.ui.windows.setShared('outputCDL003', isNoSelectRowSelected ? null : selectedCode);
                                        nts.uk.ui.windows.setShared('classificationInfoCDL003', isNoSelectRowSelected ? null : selectedInfor);
                                        nts.uk.ui.windows.close();
                                    }
                                };
                                /**
                                 * check selected code
                                 */
                                ScreenModel.prototype.getSelectBySel = function (selected, selectedCodes) {
                                    var a = _.find(selectedCodes, function (x) {
                                        return x.code === selected;
                                    });
                                    if (a) {
                                        return a.code;
                                    }
                                    return undefined;
                                };
                                /**
                                 * check selected array code
                                 */
                                ScreenModel.prototype.getSelectByMul = function (selected, selectedCodes) {
                                    var resSeleted = [];
                                    for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
                                        var selectedCode = selected_1[_i];
                                        if (this.getSelectBySel(selectedCode, selectedCodes)) {
                                            resSeleted.push(selectedCode);
                                        }
                                    }
                                    return resSeleted;
                                };
                                /**
                                 * get information
                                 */
                                ScreenModel.prototype.getInforBySel = function (selected, selectedCodes) {
                                    var a = _.find(selectedCodes, function (x) {
                                        return x.code === selected;
                                    });
                                    if (a) {
                                        return a;
                                    }
                                    return undefined;
                                };
                                /**
                                 * get information
                                 */
                                ScreenModel.prototype.getInforByMul = function (selected, selectedCodes) {
                                    var resSeleted = [];
                                    for (var _i = 0, selected_2 = selected; _i < selected_2.length; _i++) {
                                        var selectedCode = selected_2[_i];
                                        var infor = this.getInforBySel(selectedCode, selectedCodes);
                                        if (infor) {
                                            resSeleted.push(infor);
                                        }
                                    }
                                    return resSeleted;
                                };
                                /**
                                 * close windows
                                 */
                                ScreenModel.prototype.closeWindows = function () {
                                    nts.uk.ui.windows.setShared('CDL003Cancel', true);
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a_1.viewmodel || (a_1.viewmodel = {}));
                    })(a = cdl003.a || (cdl003.a = {}));
                })(cdl003 = view.cdl003 || (view.cdl003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl003.a.vm.js.map