var cmm044;
(function (cmm044) {
    var c;
    (function (c) {
        var viewmodel;
        (function (viewmodel) {
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    this.period = ko.observable(null);
                    this.startDate = ko.observable(null);
                    this.endDate = ko.observable(null);
                    this.targetId = ko.observable(null);
                    this.targetCode = ko.observable(null);
                    this.targetName = ko.observable(null);
                    this.approverId = ko.observable(null);
                    this.approverCode = ko.observable(null);
                    this.approverName = ko.observable(null);
                    this.emailContent = ko.observable(null);
                    var self = this;
                    var data = nts.uk.ui.windows.getShared('cmm044_Email');
                    if (data) {
                        self.startDate(data.startDate);
                        self.endDate(data.endDate);
                        self.period(nts.uk.time.formatDate(new Date(data.startDate), "yyyy/MM/dd") + " ～ " + nts.uk.time.formatDate(new Date(data.endDate), "yyyy/MM/dd"));
                        self.targetId(data.targetId);
                        self.targetCode(data.targetCode);
                        self.targetName(data.targetName);
                        self.approverId(data.approverId);
                        self.approverCode(data.approverCode);
                        self.approverName(data.approverName);
                        self.emailContent(nts.uk.resource.getText("CMM044_40", [self.period(), self.targetCode(), self.targetName(), self.approverCode(), self.approverName()]));
                    }
                }
                ScreenModel.prototype.sendMail = function () {
                    var self = this;
                    nts.uk.ui.block.invisible();
                    c.service.sendMail({ approverId: self.approverId(), emailContent: self.emailContent() }).then(function () {
                        nts.uk.ui.dialog.info({ messageId: "Msg_792" }).then(function () {
                            nts.uk.ui.windows.close();
                        });
                    }).fail(function (error) {
                        nts.uk.ui.dialog.alert(error).then(function () {
                            if (error.messageId == "Msg_1057") {
                                nts.uk.ui.windows.close();
                            }
                        });
                    }).always(function () {
                        nts.uk.ui.block.clear();
                    });
                };
                ScreenModel.prototype.closeDialog = function () {
                    nts.uk.ui.windows.close();
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
    })(c = cmm044.c || (cmm044.c = {}));
})(cmm044 || (cmm044 = {}));
//# sourceMappingURL=cmm044.c.vm.js.map