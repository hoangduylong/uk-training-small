var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var l;
                    (function (l) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.lstAppName = [];
                                    var self = this;
                                    self.date = ko.observable(moment(new Date()).toDate());
                                    var param = nts.uk.ui.windows.getShared('CMM018L_PARAM');
                                    self.sysAtr = param.sysAtr || 0;
                                    _.each(param.lstName, function (app) {
                                        self.lstAppName.push({ value: app.value, name: app.localizedName, empRAtr: app.employRootAtr });
                                    });
                                }
                                //閉じるボタン
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                //Excel出力
                                ScreenModel.prototype.printExcel = function () {
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    var self = this;
                                    nts.uk.ui.block.grayout();
                                    l.service.saveExcel({ sysAtr: self.sysAtr, baseDate: self.date(), lstAppName: self.lstAppName })
                                        .done(function () { nts.uk.ui.block.clear(); })
                                        .fail(function (res) {
                                        nts.uk.ui.dialog.alert({ messageId: res.messageId || res.message });
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = l.viewmodel || (l.viewmodel = {}));
                    })(l = cmm018.l || (cmm018.l = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.l.vm.js.map