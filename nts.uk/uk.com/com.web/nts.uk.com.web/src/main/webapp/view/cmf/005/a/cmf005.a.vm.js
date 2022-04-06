var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                }
                                /**
                                 * request to delete data screen
                                 */
                                ScreenModel.prototype.openDeleteDataScreen = function () {
                                    nts.uk.request.jump("/view/cmf/005/b/index.xhtml");
                                };
                                ScreenModel.prototype.openSettingScreen = function () {
                                    nts.uk.request.jump("/view/cmf/005/c/index.xhtml");
                                };
                                ScreenModel.prototype.openHistoryScreen = function () {
                                    nts.uk.request.jump("/view/cmf/005/i/index.xhtml");
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmf005.a || (cmf005.a = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.a.vm.js.map