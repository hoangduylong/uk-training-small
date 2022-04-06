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
                    var h;
                    (function (h) {
                        var viewmodel;
                        (function (viewmodel) {
                            var blockUI = nts.uk.ui.block;
                            var ForgotPasswordCommand = h.service.ForgotPasswordCommand;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.userName = ko.observable(null);
                                    self.userId = ko.observable(null);
                                    self.passwordNew = ko.observable(null);
                                    self.passwordNewConfirm = ko.observable(null);
                                    self.embeddedId = ko.observable(null);
                                    self.loginId = ko.observable(null);
                                    self.contractCode = ko.observable(null);
                                    self.contractPassword = ko.observable(null);
                                }
                                /**
                                 * Start page.
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var url = _.toLower($(location).attr('href'));
                                    self.embeddedId(url.substring(url.indexOf("=") + 1, url.length));
                                    // block ui
                                    nts.uk.ui.block.invisible();
                                    //get userName
                                    h.service.getUserNameByURL(self.embeddedId()).done(function (data) {
                                        self.userName(data.userName);
                                        self.userId(data.userId);
                                        self.loginId(data.loginId);
                                        self.contractCode(data.contractCode);
                                    });
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
                                    //check hasError
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    //check userId null
                                    if (_.isEmpty(self.userId())) {
                                        return;
                                    }
                                    blockUI.invisible();
                                    //add command
                                    var command = new ForgotPasswordCommand(self.embeddedId(), self.userId(), _.escape(self.passwordNew()), _.escape(self.passwordNewConfirm()));
                                    h.service.submitForgotPass(command).done(function () {
                                        var submitData = {};
                                        nts.uk.characteristics.restore("contractInfo").done(function (loginInfo) {
                                            //Set SubmitData
                                            if (loginInfo) {
                                                submitData.contractPassword = _.escape(loginInfo.contractPassword);
                                            }
                                            submitData.loginId = nts.uk.text.padRight(_.escape(self.loginId()), " ", 12);
                                            submitData.password = _.escape(self.passwordNew());
                                            submitData.contractCode = _.escape(self.contractCode());
                                            //login
                                            h.service.submitLogin(submitData).done(function (messError) {
                                                //Remove LoginInfo
                                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                                                blockUI.clear();
                                            }).fail(function (res) {
                                                //Return Dialog Error
                                                if (!nts.uk.util.isNullOrEmpty(res.parameterIds)) {
                                                    nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                                }
                                                else {
                                                    nts.uk.ui.dialog.alertError(res.messageId);
                                                }
                                                blockUI.clear();
                                            });
                                        });
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
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = h.viewmodel || (h.viewmodel = {}));
                    })(h = ccg007.h || (ccg007.h = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.h.vm.js.map