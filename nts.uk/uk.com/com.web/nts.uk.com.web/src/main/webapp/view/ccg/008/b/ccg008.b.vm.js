var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg008;
                (function (ccg008) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.check = false;
                                    self.checkTopPage = true;
                                    self.checkMyPage = true;
                                    self.transferData = ko.observable(null);
                                    self.start();
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    $("#btn_close").focus();
                                    self.transferData(nts.uk.ui.windows.getShared('CCG008_layout'));
                                    self.checkTopPage = nts.uk.ui.windows.getShared('checkTopPage');
                                    self.checkMyPage = nts.uk.ui.windows.getShared('checkMyPage');
                                    if (!self.checkMyPage || !self.checkTopPage) {
                                        self.check = true;
                                        //               nts.uk.ui.windows.getSelf().setHeight(220); 
                                    }
                                };
                                //close dialog
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                //open dialog top page setting (トップページの選択)
                                ScreenModel.prototype.openTopPageSet = function () {
                                    var dialogTitle = nts.uk.resource.getText("CCG008_3");
                                    nts.uk.ui.windows.sub.modal("/view/ccg/008/c/index.xhtml", { title: dialogTitle });
                                };
                                //open dialog my page setting (マイページ設定)
                                ScreenModel.prototype.openMyPageSet = function () {
                                    var self = this;
                                    nts.uk.ui.windows.setShared('layout', self.transferData());
                                    nts.uk.ui.windows.sub.modal("/view/ccg/031/a/index.xhtml");
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = ccg008.b || (ccg008.b = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg008.b.vm.js.map