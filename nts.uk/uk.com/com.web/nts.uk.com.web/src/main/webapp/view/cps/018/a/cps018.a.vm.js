var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps018;
                (function (cps018) {
                    var viewmodel;
                    (function (viewmodel) {
                        var ScreenModel = /** @class */ (function () {
                            function ScreenModel() {
                                var self = this;
                            }
                            ScreenModel.prototype.startPage = function () {
                                var self = this;
                                var dfd = $.Deferred();
                                dfd.resolve();
                                return dfd.promise();
                            };
                            ScreenModel.prototype.openCAS001 = function () {
                                nts.uk.request.jump("/view/cas/001/a/index.xhtml", { isFromCPS018: true });
                            };
                            ScreenModel.prototype.openCPS001 = function () {
                                nts.uk.request.jump("/view/cps/001/a/index.xhtml", { isFromCPS018: true });
                            };
                            ScreenModel.prototype.openCPS002 = function () {
                                nts.uk.request.jump("/view/cps/002/a/index.xhtml", { isFromCPS018: true });
                            };
                            ScreenModel.prototype.openCPS003 = function () {
                                nts.uk.request.jump("/view/cps/003/a/index.xhtml", { isFromCPS018: true });
                            };
                            ScreenModel.prototype.openCPS007 = function () {
                                nts.uk.request.jump("/view/cps/007/a/index.xhtml", { isFromCPS018: true });
                            };
                            ScreenModel.prototype.openCPS008 = function () {
                                nts.uk.request.jump("/view/cps/008/a/index.xhtml", { isFromCPS018: true });
                            };
                            ScreenModel.prototype.openCPS009 = function () {
                                nts.uk.request.jump("/view/cps/009/a/index.xhtml", { isFromCPS018: true });
                            };
                            return ScreenModel;
                        }());
                        viewmodel.ScreenModel = ScreenModel;
                    })(viewmodel = cps018.viewmodel || (cps018.viewmodel = {}));
                })(cps018 = view.cps018 || (view.cps018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps018.a.vm.js.map