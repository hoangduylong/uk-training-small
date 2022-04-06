var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf001;
                (function (cmf001) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                }
                                /**
                                 * request to create creation screen
                                 */
                                ScreenModel.prototype.importScreen = function () {
                                    var self = this;
                                    nts.uk.request.jump("/view/cmf/001/x/index.xhtml");
                                };
                                /**
                                 * request to create creation screen
                                 */
                                ScreenModel.prototype.settingScreenB = function () {
                                    var self = this;
                                    nts.uk.request.jump("/view/cmf/001/b/index.xhtml");
                                };
                                ScreenModel.prototype.settingScreenE = function () {
                                    var self = this;
                                    nts.uk.request.jump("/view/cmf/001/e/index.xhtml");
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmf001.a || (cmf001.a = {}));
                })(cmf001 = view.cmf001 || (view.cmf001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf001.a.vm.js.map