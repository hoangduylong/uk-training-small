var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var pr;
        (function (pr) {
            var view;
            (function (view) {
                var ccg007;
                (function (ccg007) {
                    var e;
                    (function (e) {
                        var viewmodel;
                        (function (viewmodel) {
                            var blockUI = nts.uk.ui.block;
                            var ChangePasswordCommand = e.service.ChangePasswordCommand;
                            var EmployeeInforDto = e.service.EmployeeInforDto;
                            var getMessage = nts.uk.resource.getMessage;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel(parentData) {
                                    this.reasonUpdatePw = ko.observable("");
                                    var self = this;
                                    self.userName = ko.observable(null);
                                    self.passwordCurrent = ko.observable(null);
                                    self.passwordNew = ko.observable(null);
                                    self.passwordNewConfirm = ko.observable(null);
                                    //parent data
                                    self.callerParameter = parentData;
                                }
                                /**
                                 * Start page.
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var changePw = nts.uk.ui.windows.getShared('changePw');
                                    if (changePw === undefined) {
                                        self.reasonUpdatePw('');
                                    }
                                    else {
                                        if (changePw.reasonUpdatePw == 'Msg_1523') {
                                            self.reasonUpdatePw(getMessage(changePw.reasonUpdatePw, [changePw.spanDays]));
                                        }
                                        else {
                                            self.reasonUpdatePw(getMessage(changePw.reasonUpdatePw));
                                        }
                                    }
                                    // block ui
                                    nts.uk.ui.block.invisible();
                                    if (self.callerParameter.form1) {
                                        //get userName
                                        e.service.getUserNameByLoginId(self.callerParameter.contractCode, self.callerParameter.loginId).done(function (data) {
                                            self.userName(data.userName);
                                        });
                                    }
                                    else {
                                        //add command
                                        var dto = new EmployeeInforDto(self.callerParameter.contractCode, self.callerParameter.employeeCode, self.callerParameter.companyCode);
                                        //get userName
                                        e.service.getUserNameByEmployeeCode(dto).done(function (data) {
                                            self.userName(data.userName);
                                        });
                                    }
                                    dfd.resolve();
                                    //clear block
                                    nts.uk.ui.block.clear();
                                    return dfd.promise();
                                };
                                /**
                                 * Submit
                                 */
                                ScreenModel.prototype.submit = function () {
                                    var self = this;
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    blockUI.invisible();
                                    //add command
                                    var command = new ChangePasswordCommand(self.passwordCurrent(), self.passwordNew(), self.passwordNewConfirm());
                                    //submitChangePass
                                    e.service.submitChangePass(command).done(function () {
                                        blockUI.clear();
                                        nts.uk.ui.windows.setShared("changePwDone", true);
                                        nts.uk.ui.windows.close();
                                    }).fail(function (res) {
                                        //Return Dialog Error
                                        self.showMessageError(res);
                                        blockUI.clear();
                                    });
                                };
                                /**
                                 * showMessageError
                                 */
                                ScreenModel.prototype.showMessageError = function (res) {
                                    var dfd = $.Deferred();
                                    // check error business exception
                                    if (!res.businessException) {
                                        return;
                                    }
                                    // show error message
                                    if (Array.isArray(res.errors)) {
                                        nts.uk.ui.dialog.bundledErrors(res);
                                    }
                                    else {
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                    }
                                };
                                //open dialog I 
                                ScreenModel.prototype.OpenDialogI = function () {
                                    var self = this;
                                    nts.uk.ui.windows.sub.modal('/view/ccg/007/i/index.xhtml', {
                                        width: 520,
                                        height: 300
                                    }).onClosed(function () { });
                                };
                                /**
                                 * close dialog
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.setShared("changePwDone", false);
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = e.viewmodel || (e.viewmodel = {}));
                    })(e = ccg007.e || (ccg007.e = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.e.vm.js.map