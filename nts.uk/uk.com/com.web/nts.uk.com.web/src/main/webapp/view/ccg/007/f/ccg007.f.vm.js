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
                    var f;
                    (function (f) {
                        var viewmodel;
                        (function (viewmodel) {
                            var blockUI = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel(parentData) {
                                    var self = this;
                                    self.loginId = ko.observable(null);
                                    //parent data
                                    self.callerParameter = parentData;
                                }
                                /**
                                 * Start page.
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    // block ui
                                    nts.uk.ui.block.invisible();
                                    self.loginId(self.callerParameter.loginId);
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
                                    blockUI.invisible();
                                    f.service.submitSendMail(self.callerParameter).done(function (data) {
                                        if (!nts.uk.util.isNullOrEmpty(data.url)) {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_207" }).then(function () {
                                                nts.uk.ui.windows.close();
                                            });
                                        }
                                        else {
                                            nts.uk.ui.windows.close();
                                        }
                                        blockUI.clear();
                                    }).fail(function (res) {
                                        //Return Dialog Error
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                        blockUI.clear();
                                    });
                                };
                                /**
                                 * close dialog
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = f.viewmodel || (f.viewmodel = {}));
                    })(f = ccg007.f || (ccg007.f = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.f.vm.js.map