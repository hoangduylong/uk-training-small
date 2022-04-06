var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg013;
                (function (ccg013) {
                    var e;
                    (function (e) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.code = ko.observable('');
                                    self.name = ko.observable('');
                                    self.allowOverwrite = ko.observable(false);
                                    self.currentWebMenu = ko.observable(null);
                                    self.currentWebMenuCode = ko.observable('');
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    self.currentWebMenu(nts.uk.ui.windows.getShared("CCG013E_COPY"));
                                    nts.uk.text.padLeft(self.currentWebMenuCode(self.currentWebMenu().webMenuCode), '0', 3);
                                };
                                /**
                                 * Pass data to main screen
                                 * Close the popup
                                 */
                                ScreenModel.prototype.submit = function () {
                                    var self = this;
                                    nts.uk.ui.block.invisible();
                                    validateNameInput($("#web-name"), '#[CCG013_50]', self.name().trim(), 'WebMenuName');
                                    var code = self.code();
                                    var name = self.name();
                                    var allowOverwrite = self.allowOverwrite();
                                    var data = {
                                        currentWebMenuCode: self.currentWebMenuCode(),
                                        allowOverwrite: allowOverwrite,
                                        webMenuCode: code,
                                        webMenuName: name
                                    };
                                    $("#web-code").trigger("validate");
                                    $("#web-name").trigger("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        nts.uk.ui.block.clear();
                                        return;
                                    }
                                    e.service.copy(data).done(function () {
                                        nts.uk.ui.windows.setShared("CCG013E_WEB_CODE_COPY", code);
                                        nts.uk.ui.dialog.info({ messageId: "Msg_20" }).then(function () {
                                            nts.uk.ui.windows.close();
                                        });
                                    }).fail(function (error) {
                                        nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                /**
                                 * Click on button i1_9
                                 * Close the popup
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    var self = this;
                                    nts.uk.ui.windows.setShared("CCG013E_WEB_CODE_COPY", self.currentWebMenuCode());
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = e.viewmodel || (e.viewmodel = {}));
                    })(e = ccg013.e || (ccg013.e = {}));
                })(ccg013 = view.ccg013 || (view.ccg013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg013.e.vm.js.map