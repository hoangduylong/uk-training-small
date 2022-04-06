var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl028;
                (function (cdl028) {
                    var test;
                    (function (test) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                }
                                /**
                                 * startPage
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * closeDialog
                                 */
                                ScreenModel.prototype.openDialog = function () {
                                    var params = {
                                        date: "2000/01/01",
                                        mode: 5
                                    };
                                    nts.uk.ui.windows.setShared("CDL028_INPUT", params);
                                    nts.uk.ui.windows.sub.modal("/view/cdl/028/a/index.xhtml").onClosed(function () {
                                        console.log(nts.uk.ui.windows.getShared("CDL028_A_PARAMS"));
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = test.viewmodel || (test.viewmodel = {}));
                    })(test = cdl028.test || (cdl028.test = {}));
                })(cdl028 = view.cdl028 || (view.cdl028 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl028.test.vm.js.map