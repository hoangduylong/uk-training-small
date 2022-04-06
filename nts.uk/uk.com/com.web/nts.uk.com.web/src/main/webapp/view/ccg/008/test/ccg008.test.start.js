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
                    var test;
                    (function (test) {
                        __viewContext.ready(function () {
                            var screenModel = new ScreenModel();
                            __viewContext.bind(screenModel);
                        });
                        var ScreenModel = /** @class */ (function () {
                            function ScreenModel() {
                                var self = this;
                                self.topPageCode = ko.observable("");
                            }
                            ScreenModel.prototype.loginScreen = function () {
                                var self = this;
                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                            };
                            ScreenModel.prototype.topPage = function () {
                                var self = this;
                                if (nts.uk.ui.errors.hasError() || !self.topPageCode()) {
                                    nts.uk.ui.dialog.alertError("トップページコードを入力してください");
                                    $("#toppagecode").focus();
                                    return;
                                }
                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { topPageCode: self.topPageCode() });
                            };
                            ScreenModel.prototype.otherScreen = function () {
                                var self = this;
                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml", {});
                            };
                            return ScreenModel;
                        }());
                        test.ScreenModel = ScreenModel;
                    })(test = ccg008.test || (ccg008.test = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg008.test.start.js.map