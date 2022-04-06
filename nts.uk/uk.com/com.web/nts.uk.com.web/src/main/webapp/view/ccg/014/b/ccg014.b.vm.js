var ccg014;
(function (ccg014) {
    var b;
    (function (b) {
        var viewmodel;
        (function (viewmodel) {
            var ScreenModel = /** @class */ (function () {
                function ScreenModel(data) {
                    var self = this;
                    self.titlecode = ko.observable(data.titleMenuCD);
                    self.titlename = ko.observable(data.name);
                    self.copyTitleCD = ko.observable('');
                    self.copyName = ko.observable('');
                    self.checkOverwritting = ko.observable(true);
                    if (nts.uk.util.isNullOrEmpty(self.copyTitleCD())) {
                        _.defer(function () { $("#copycode").focus(); });
                    }
                }
                /** Close Dialog */
                ScreenModel.prototype.cancel_Dialog = function () {
                    nts.uk.ui.windows.close();
                };
                ScreenModel.prototype.clearError = function () {
                    var self = this;
                    if (self.titlecode !== null) {
                        nts.uk.ui.errors.clearAll();
                    }
                    if (self.titlename !== null) {
                        nts.uk.ui.errors.clearAll();
                    }
                };
                /* Copy TitleMenu */
                ScreenModel.prototype.submitClickButton = function () {
                    var self = this;
                    self.copyTitleCD(nts.uk.text.padLeft(self.copyTitleCD(), '0', 4));
                    b.service.copyTitleMenu(self.titlecode(), self.copyTitleCD(), self.copyName(), self.checkOverwritting()).done(function () {
                        nts.uk.ui.block.invisible();
                        nts.uk.ui.windows.setShared("copyTitleMenuCD", self.copyTitleCD(), false);
                        nts.uk.ui.dialog.info({ messageId: "Msg_20" }).then(function () {
                            self.cancel_Dialog();
                        });
                    }).fail(function (res) {
                        $("#copycode").focus();
                        nts.uk.ui.dialog.alert({ messageId: res.messageId });
                    }).always(function () {
                        nts.uk.ui.block.clear();
                    });
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
    })(b = ccg014.b || (ccg014.b = {}));
})(ccg014 || (ccg014 = {}));
//# sourceMappingURL=ccg014.b.vm.js.map