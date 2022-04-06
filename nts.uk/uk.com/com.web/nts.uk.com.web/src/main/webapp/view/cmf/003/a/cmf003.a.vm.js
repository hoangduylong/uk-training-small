var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf003;
                (function (cmf003) {
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
                                ScreenModel.prototype.save = function () {
                                    var self = this;
                                    nts.uk.request.jump("/view/cmf/003/b/index.xhtml");
                                };
                                /**
                                 * request to create creation screen
                                 */
                                ScreenModel.prototype.autoSave = function () {
                                    var self = this;
                                    nts.uk.request.jump("/view/cmf/003/c/index.xhtml");
                                };
                                /**
                                 * request to reference history screen
                                 */
                                ScreenModel.prototype.referenceHistoryScreen = function () {
                                    var self = this;
                                    nts.uk.request.jump("/view/cmf/003/i/index.xhtml");
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmf003.a || (cmf003.a = {}));
                })(cmf003 = view.cmf003 || (view.cmf003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf003.a.vm.js.map