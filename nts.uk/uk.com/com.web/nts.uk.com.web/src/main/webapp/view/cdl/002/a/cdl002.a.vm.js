var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl002;
                (function (cdl002) {
                    var a;
                    (function (a) {
                        var close = nts.uk.ui.windows.close;
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var SelectType = kcp.share.list.SelectType;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _this = this;
                                    /**
                                     * Decide Employment
                                     */
                                    this.decideData = function () {
                                        var self = _this;
                                        if (self.isMultiSelect() && self.selectedMulEmployment().length == 0) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_640" });
                                            return;
                                        }
                                        var isNoSelectRowSelected = $("#jobtitle").isNoSelectRowSelected();
                                        if (!self.isMultiSelect() && !self.selectedSelEmployment() && !isNoSelectRowSelected) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_640" });
                                            return;
                                        }
                                        setShared('CDL002Output', self.isMultiSelect() ? self.selectedMulEmployment() : self.selectedSelEmployment());
                                        close();
                                    };
                                    var self = this;
                                    var params = getShared('CDL002Params');
                                    self.selectedMulEmployment = ko.observableArray([]);
                                    self.selectedSelEmployment = ko.observable('');
                                    self.isMultiSelect = ko.observable(params.isMultiple);
                                    self.isShowWorkClosure = ko.observable(false);
                                    self.isCheckShowWorkClosure = false;
                                    if (self.isMultiSelect()) {
                                        self.selectedMulEmployment(params.selectedCodes ? params.selectedCodes : []);
                                    }
                                    else {
                                        if (params.selectedCodes.length > 0) {
                                            self.selectedSelEmployment(params.selectedCodes[0]);
                                        }
                                    }
                                    // If Selection Mode is Multiple Then not show Unselected Row
                                    self.isDisplayUnselect = ko.observable(self.isMultiSelect() ? false : params.showNoSelection);
                                    // Set value for Multiple Use by isShowWorkClosure 
                                    if (_.isNil(params.isShowWorkClosure)) {
                                        self.isCheckShowWorkClosure = true;
                                    }
                                    else {
                                        self.isCheckShowWorkClosure = params.isShowWorkClosure ? true : false;
                                    }
                                    // Initial listComponentOption
                                    self.listComponentOption = {
                                        isMultiSelect: self.isMultiSelect(),
                                        isDisplayClosureSelection: self.isCheckShowWorkClosure,
                                        listType: ListType.EMPLOYMENT,
                                        selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                        selectedCode: params.selectedCodes,
                                        isDialog: true,
                                        selectedClosureId: ko.observable(null),
                                        isShowNoSelectRow: self.isDisplayUnselect(),
                                        maxRows: 10,
                                        isSelectAllAfterReload: false,
                                        tabindex: 1,
                                        backupSelectedCode: params.selectedCodes
                                    };
                                    if (self.isMultiSelect()) {
                                        self.listComponentOption.selectedCode = self.selectedMulEmployment;
                                    }
                                    else {
                                        self.listComponentOption.selectedCode = self.selectedSelEmployment;
                                    }
                                }
                                /**
                                 * Close dialog.
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    setShared('CDL002Cancel', true);
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.getClosureByEmployment = function (employmentId) {
                                    var dfd = $.Deferred();
                                    nts.uk.request.ajax('at', "ctx/at/shared/workrule/closure/getclosuretiedbyemployment/" + employmentId).done(function (closureId) {
                                        dfd.resolve(closureId);
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * function check employment
                                 */
                                ScreenModel.prototype.checkExistEmployment = function (code, data) {
                                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                                        var item = data_1[_i];
                                        if (code === item.code) {
                                            return true;
                                        }
                                    }
                                    return false;
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /**
                            * List Type
                            */
                            var ListType = /** @class */ (function () {
                                function ListType() {
                                }
                                ListType.EMPLOYMENT = 1;
                                ListType.Classification = 2;
                                ListType.JOB_TITLE = 3;
                                ListType.EMPLOYEE = 4;
                                return ListType;
                            }());
                            viewmodel.ListType = ListType;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cdl002.a || (cdl002.a = {}));
                })(cdl002 = view.cdl002 || (view.cdl002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl002.a.vm.js.map