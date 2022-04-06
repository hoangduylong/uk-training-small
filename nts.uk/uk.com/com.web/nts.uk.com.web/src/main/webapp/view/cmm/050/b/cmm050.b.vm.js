var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm050;
                (function (cmm050) {
                    var b;
                    (function (b) {
                        var getShared = nts.uk.ui.windows.getShared;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.emailFrom = ko.observable(null);
                                    this.emailTo = ko.observable(null);
                                    var self = this;
                                    var param = getShared("CMM050Params");
                                    self.emailFrom(param.emailAuth);
                                }
                                ScreenModel.prototype.proceedTestEmail = function () {
                                    var self = this;
                                    nts.uk.ui.block.grayout();
                                    var param = new b.model.MailServerTest(self.emailFrom(), self.emailTo(), new b.model.MailContents());
                                    b.service.testMailServerSetting(param)
                                        .then(function () { return nts.uk.ui.dialog.info({ messageId: "Msg_534" }); })
                                        .fail(function (err) { return nts.uk.ui.dialog.alertError({ messageId: err.messageId }); })
                                        .always(function () { return nts.uk.ui.block.clear().then(function () { return self.closeDialog(); }); });
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmm050.b || (cmm050.b = {}));
                })(cmm050 = view.cmm050 || (view.cmm050 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm050.b.vm.js.map