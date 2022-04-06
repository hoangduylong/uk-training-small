var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cli003;
                (function (cli003) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                }
                                /**
                                 * request to  data screen b
                                 */
                                ScreenModel.prototype.func_Screen_b = function () {
                                    nts.uk.request.jump("/view/cli/003/b/index.xhtml");
                                };
                                ScreenModel.prototype.func_Screen_g = function () {
                                    nts.uk.request.jump("/view/cli/003/g/index.xhtml");
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cli003.a || (cli003.a = {}));
                })(cli003 = view.cli003 || (view.cli003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli003.a.vm.js.map